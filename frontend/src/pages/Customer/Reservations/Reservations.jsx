import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createReservation,
  getAllReservations,
} from "../../../services/reservationService";

//import "../../../assets/css/customerReservations.css";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

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
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await getAllReservations();
      setReservations(response.reservations || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reservations.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReservation(formData);

      toast.success("Reservation booked successfully!");

      setFormData({
        customerName: "",
        email: "",
        phone: "",
        reservationDate: "",
        reservationTime: "",
        numberOfGuests: "",
        specialRequest: "",
      });

      fetchReservations();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to book reservation."
      );
    }
  };

  return (
    <div className="reservations-page">

      <div
        className="container py-5"
        style={{ maxWidth: "1450px" }}
      >

        <h2 className="text-center text-white fw-bold mb-5">
          📅 My Reservations
        </h2>

        <div className="row g-4">

          {/* Reservation Form */}

          <div className="col-lg-6">

            <div className="card shadow h-100">

              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  Book a Table
                </h4>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label">
                      Customer Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Reservation Date
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        name="reservationDate"
                        value={formData.reservationDate}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Reservation Time
                      </label>

                      <input
                        type="time"
                        className="form-control"
                        name="reservationTime"
                        value={formData.reservationTime}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Number of Guests
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="numberOfGuests"
                      placeholder="Enter number of guests"
                      value={formData.numberOfGuests}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (/^\d*$/.test(value)) {
                          setFormData({
                            ...formData,
                            numberOfGuests: value,
                          });
                        }
                      }}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Special Request
                    </label>

                    <textarea
                      className="form-control"
                      rows="3"
                      name="specialRequest"
                      value={formData.specialRequest}
                      onChange={handleChange}
                      placeholder="Birthday celebration, window seat, etc."
                    ></textarea>

                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                  >
                    Book Reservation
                  </button>

                </form>

              </div>

            </div>

          </div>

          {/* Reservation History */}

          <div className="col-lg-6">

            <div className="card shadow h-100">

              <div className="card-header bg-success text-white">
                <h4 className="mb-0">
                  Reservation History
                </h4>
              </div>

              <div className="card-body">

                {reservations.length === 0 ? (

                  <p className="text-center text-muted">
                    No reservations found.
                  </p>

                ) : (

                  reservations.map((reservation) => (

                    <div
                      className="card mb-3"
                      key={reservation._id}
                    >

                      <div className="card-body">

                        <h5>{reservation.customerName}</h5>

                        <p className="mb-1">
                          📅 <strong>Date:</strong>{" "}
                          {new Date(
                            reservation.reservationDate
                          ).toLocaleDateString()}
                        </p>

                        <p className="mb-1">
                          🕒 <strong>Time:</strong>{" "}
                          {reservation.reservationTime}
                        </p>

                        <p className="mb-1">
                          👥 <strong>Guests:</strong>{" "}
                          {reservation.numberOfGuests}
                        </p>

                        <p className="mb-1">
                          📌 <strong>Status:</strong>{" "}
                          <span className="badge bg-warning text-dark">
                            {reservation.status}
                          </span>
                        </p>

                        {reservation.specialRequest && (
                          <p className="mb-0">
                            💬 <strong>Request:</strong>{" "}
                            {reservation.specialRequest}
                          </p>
                        )}

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Reservations;