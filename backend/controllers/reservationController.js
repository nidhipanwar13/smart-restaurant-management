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
      tableNumber,
      specialRequest,
    } = req.body;

    // Check required fields
    if (
      !customerName ||
      !email ||
      !phone ||
      !reservationDate ||
      !reservationTime ||
      !numberOfGuests ||
      !tableNumber
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Date validation
    const bookingDate = new Date(reservationDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return res.status(400).json({
        message: "Reservation date cannot be in the past",
      });
    }

    // Guest validation
    if (numberOfGuests < 1) {
      return res.status(400).json({
        message: "Number of guests must be at least 1",
      });
    }

    // Check duplicate reservation
    const existingReservation = await Reservation.findOne({
      reservationDate,
      reservationTime,
      tableNumber,
      status: { $ne: "Cancelled" },
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "Table is already reserved for this date and time",
      });
    }

    // Create reservation
    const reservation = await Reservation.create({
      customerName,
      email,
      phone,
      reservationDate,
      reservationTime,
      numberOfGuests,
      tableNumber,
      specialRequest,
    });

    res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({
      reservationDate: 1,
      reservationTime: 1,
    });

    res.status(200).json({
      count: reservations.length,
      reservations,
    });
  } catch (error) {
    res.status(500).json({
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
        message: "Reservation not found",
      });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({
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
        message: "Reservation not found",
      });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Reservation updated successfully",
      reservation: updatedReservation,
    });
  } catch (error) {
    res.status(500).json({
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
        message: "Reservation not found",
      });
    }

    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};