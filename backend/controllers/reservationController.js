const Reservation = require("../models/Reservation");

// Create Reservation
exports.createReservation = async (req, res) => {
    try {
        const {
            customerName,
            email,
            phone,
            reservationDate,
            reservationSlot,
            numberOfGuests,
            specialRequest,
        } = req.body;

        if (
            !customerName ||
            !email ||
            !phone ||
            !reservationDate ||
            !reservationSlot ||
            !numberOfGuests
        ) {
            return res.status(400).json({
                message: "Please fill all required fields.",
            });
        }

        const bookingDate = new Date(reservationDate);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (bookingDate < today) {
            return res.status(400).json({
                message: "Reservation date cannot be in the past.",
            });
        }

        if (Number(numberOfGuests) < 1) {
            return res.status(400).json({
                message: "Number of guests must be at least 1.",
            });
        }
        // Maximum reservations allowed per slot
        const MAX_RESERVATIONS_PER_SLOT = 5;

        // Count reservations for same date and slot
        const existingReservations = await Reservation.countDocuments({
            reservationDate: bookingDate,
            reservationSlot,
            status: {
                $ne: "Cancelled",
            },
        });

        if (existingReservations >= MAX_RESERVATIONS_PER_SLOT) {
            return res.status(400).json({
                success: false,
                message:
                    "This time slot is fully booked. Please select another time slot.",
            });
        }
        const reservation = await Reservation.create({
            customerName,
            email,
            phone,
            reservationDate,
            reservationSlot,
            numberOfGuests,
            specialRequest,
        });

        res.status(201).json({
            success: true,
            message: "Reservation created successfully.",
            reservation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: reservations.length,
            reservations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Reservation By ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found.",
            });
        }

        res.status(200).json({
            success: true,
            reservation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Check Slot Availability
exports.checkSlotAvailability = async (req, res) => {
    try {
        const { date, slot } = req.query;

        if (!date || !slot) {
            return res.status(400).json({
                success: false,
                message: "Date and slot are required.",
            });
        }

        const bookingDate = new Date(date);

        const MAX_RESERVATIONS_PER_SLOT = 5;

        const totalReservations = await Reservation.countDocuments({
            reservationDate: bookingDate,
            reservationSlot: slot,
            status: {
                $ne: "Cancelled",
            },
        });

        res.status(200).json({
            success: true,
            available: totalReservations < MAX_RESERVATIONS_PER_SLOT,
            booked: totalReservations,
            remaining: Math.max(
                MAX_RESERVATIONS_PER_SLOT - totalReservations,
                0
            ),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Reservation
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found.",
            });
        }

        const currentStatus = reservation.status;
        const newStatus = req.body.status;

        // Allow only valid status transitions
        if (newStatus && newStatus !== currentStatus) {
            // Customer can cancel only 30 minutes before reservation
            if (newStatus === "Cancelled") {

                const reservationDate = new Date(reservation.reservationDate);

                // Example:
                // "02:00 PM - 03:00 PM"
                const slotStart =
                    reservation.reservationSlot.split(" - ")[0];

                const [time, period] = slotStart.split(" ");

                let [hours, minutes] = time.split(":").map(Number);

                if (period === "PM" && hours !== 12)
                    hours += 12;

                if (period === "AM" && hours === 12)
                    hours = 0;

                reservationDate.setHours(hours);
                reservationDate.setMinutes(minutes);
                reservationDate.setSeconds(0);

                const now = new Date();

                const difference =
                    reservationDate.getTime() -
                    now.getTime();

                const minutesRemaining =
                    difference / (1000 * 60);

                if (minutesRemaining < 30) {

                    return res.status(400).json({

                        success: false,

                        message:
                            "Reservations can only be cancelled at least 30 minutes before the reservation time.",

                    });

                }

            }
            const validTransitions = {

                Pending: [
                    "Confirmed",
                    "Cancelled",
                ],

                Confirmed: [
                    "Completed",
                    "Cancelled",
                    "No Show",
                ],

                Completed: [],

                Cancelled: [],

                "No Show": [],

            };

            if (!validTransitions[currentStatus].includes(newStatus)) {
                return res.status(400).json({
                    success: false,
                    message: `Cannot change reservation status from "${currentStatus}" to "${newStatus}".`,
                });
            }
        }

        const updatedReservation =
            await Reservation.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        res.status(200).json({
            success: true,
            message: "Reservation updated successfully.",
            reservation: updatedReservation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Reservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found.",
            });
        }

        await Reservation.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Reservation deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};