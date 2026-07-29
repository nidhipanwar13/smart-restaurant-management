import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllReservations,
  updateReservation,
  deleteReservation,
} from "../../../services/reservationService";

import "../../../assets/css/reservations.css";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    const filtered = reservations.filter((reservation) => {
      return (
        reservation.customerName.toLowerCase().includes(keyword) ||
        reservation.email.toLowerCase().includes(keyword) ||
        reservation.phone.includes(keyword)
      );
    });

    setFilteredReservations(filtered);
  }, [search, reservations]);

  const fetchReservations = async () => {
    try {
      setLoading(true);

      const response = await getAllReservations();

      const sortedReservations = response.reservations.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setReservations(sortedReservations);
      setFilteredReservations(sortedReservations);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (reservation, status) => {
    try {
      await updateReservation(reservation._id, {
        ...reservation,
        status,
      });

      toast.success(`Reservation ${status}.`);

      fetchReservations();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update reservation.");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this reservation?"
      )
    )
      return;

    try {
      await deleteReservation(id);

      toast.success("Reservation deleted successfully.");

      fetchReservations();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete reservation.");
    }
  };

  const badgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";

      case "Confirmed":
        return "bg-success";

      case "Completed":
        return "bg-primary";

      case "Cancelled":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="reservations-page">
        <div
          className="container py-5"
          style={{ maxWidth: "1450px" }}
        >
          <div className="d-flex justify-content-center align-items-center py-5">
            <div
              className="spinner-border text-light"
              role="status"
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservations-page">
      <div
        className="container py-5"
        style={{ maxWidth: "1450px" }}
      >
        {/* Header */}

        <div className="mb-5 text-center text-white">

          <h2 className="fw-bold display-6 mb-2">
            📅 Reservations Management
          </h2>

          <p className="lead mb-0">
            View and manage restaurant reservations.
          </p>

        </div>

        {/* Reservation Table */}

        <div className="card shadow reservation-card">

          <div className="card-body">

            <div className="row mb-4">

              <div className="col-md-6">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name, Email or Phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

            </div>

            {filteredReservations.length === 0 ? (

              <div className="text-center py-5">

                <h5>No Reservations Found</h5>

              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead>

                    <tr>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Guests</th>
                      <th>Status</th>
                      <th width="260">Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredReservations.map((reservation) => (

                      <tr key={reservation._id}>

                        <td className="fw-semibold">
                          {reservation.customerName}
                        </td>

                        <td>{reservation.email}</td>

                        <td>{reservation.phone}</td>

                        <td>
                          {new Date(
                            reservation.reservationDate
                          ).toLocaleDateString()}
                        </td>

                        <td>{reservation.reservationTime}</td>

                        <td>
                          <span className="badge bg-primary">
                            {reservation.numberOfGuests}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge ${badgeClass(
                              reservation.status
                            )}`}
                          >
                            {reservation.status}
                          </span>
                        </td>

                        <td>

                          {reservation.status === "Pending" && (
                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  changeStatus(
                                    reservation,
                                    "Confirmed"
                                  )
                                }
                              >
                                Confirm
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  changeStatus(
                                    reservation,
                                    "Cancelled"
                                  )
                                }
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {reservation.status === "Confirmed" && (
                            <>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() =>
                                  changeStatus(
                                    reservation,
                                    "Completed"
                                  )
                                }
                              >
                                Complete
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  changeStatus(
                                    reservation,
                                    "Cancelled"
                                  )
                                }
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {(reservation.status === "Completed" ||
                            reservation.status === "Cancelled") && (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                handleDelete(reservation._id)
                              }
                            >
                              Delete
                            </button>
                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Reservations;