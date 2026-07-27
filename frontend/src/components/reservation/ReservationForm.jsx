import React, { useEffect, useState } from "react";
import {
  createReservation,
  updateReservation,
} from "../../services/reservationService";

const ReservationForm = ({
  onReservationAdded,
  selectedReservation,
  clearSelection,
}) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    reservationDate: "",
    reservationTime: "",
    numberOfGuests: "",
    specialRequest: "",
  });

  useEffect(() => {
    if (selectedReservation) {
      setFormData({
        customerName: selectedReservation.customerName,
        email: selectedReservation.email,
        phone: selectedReservation.phone,
        reservationDate:
          selectedReservation.reservationDate.split("T")[0],
        reservationTime: selectedReservation.reservationTime,
        numberOfGuests: selectedReservation.numberOfGuests,
        specialRequest: selectedReservation.specialRequest || "",
      });
    }
  }, [selectedReservation]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      email: "",
      phone: "",
      reservationDate: "",
      reservationTime: "",
      numberOfGuests: "",
      specialRequest: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedReservation) {
        await updateReservation(selectedReservation._id, formData);
        alert("Reservation Updated Successfully!");
      } else {
        await createReservation(formData);
        alert("Reservation Created Successfully!");
      }

      resetForm();
      clearSelection();
      onReservationAdded();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="card shadow p-4">
      <h2 className="text-center mb-4">
        {selectedReservation
          ? "Update Reservation"
          : "Reserve a Table"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="row">

          {/* Customer Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Reservation Date */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Reservation Date</label>
            <input
              type="date"
              className="form-control"
              name="reservationDate"
              value={formData.reservationDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Reservation Time */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Reservation Time</label>
            <input
              type="time"
              className="form-control"
              name="reservationTime"
              value={formData.reservationTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* Number of Guests */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Number of Guests</label>
            <input
              type="number"
              min="1"
              className="form-control"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              required
            />
          </div>

          {/* Special Request */}
          <div className="col-12 mb-3">
            <label className="form-label">Special Request</label>
            <textarea
              className="form-control"
              name="specialRequest"
              rows="3"
              value={formData.specialRequest}
              onChange={handleChange}
              placeholder="Birthday celebration, window seat, wheelchair access, high chair, etc."
            />
          </div>

        </div>

        <div className="mt-3">
          <button
            type="submit"
            className={`btn ${
              selectedReservation
                ? "btn-warning"
                : "btn-primary"
            }`}
          >
            {selectedReservation
              ? "Update Reservation"
              : "Reserve Table"}
          </button>

          {selectedReservation && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                resetForm();
                clearSelection();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;