const express = require("express");
const router = express.Router();

const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  checkSlotAvailability,
} = require("../controllers/reservationController");


// Create Reservation
router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/check-slot", checkSlotAvailability);
router.get("/:id", getReservationById);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
module.exports = router;