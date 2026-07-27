import React from "react";
import { deleteReservation } from "../../services/reservationService";

const ReservationList = ({
  reservations,
  onReservationDeleted,
  onEdit,
}) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReservation(id);

      alert("Reservation deleted successfully!");

      onReservationDeleted();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete reservation."
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Cancelled":
        return "bg-danger";
      case "Completed":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="mt-5">
      <h3 className="mb-3">Reservation List</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th width="180">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.length > 0 ? (
              reservations.map((reservation, index) => (
                <tr key={reservation._id}>
                  <td className="text-center">{index + 1}</td>

                  <td>{reservation.customerName}</td>

                  <td>{reservation.email}</td>

                  <td>{reservation.phone}</td>

                  <td>
                    {new Date(
                      reservation.reservationDate
                    ).toLocaleDateString()}
                  </td>

                  <td>{reservation.reservationTime}</td>

                  <td className="text-center">
                    {reservation.numberOfGuests}
                  </td>

                  <td className="text-center">
                    <span
                      className={`badge ${getStatusBadge(
                        reservation.status
                      )}`}
                    >
                      {reservation.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(reservation)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(reservation._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No Reservations Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationList;