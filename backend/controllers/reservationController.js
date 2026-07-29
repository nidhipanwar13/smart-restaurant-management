const Reservation = require("../models/Reservation");

// Create Reservation
exports.createReservation = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      reservationDate,
      reservationTime,
      numberOfGuests,
      specialRequest,
    } = req.body;

    if (
      !customerName ||
      !email ||
      !phone ||
      !reservationDate ||
      !reservationTime ||
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

    const reservation = await Reservation.create({
      customerName,
      email,
      phone,
      reservationDate,
      reservationTime,
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
      const validTransitions = {
        Pending: ["Confirmed", "Cancelled"],
        Confirmed: ["Completed", "Cancelled"],
        Completed: [],
        Cancelled: [],
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