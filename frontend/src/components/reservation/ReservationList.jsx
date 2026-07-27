import React from "react";
import { deleteReservation } from "../../services/reservationService";

const ReservationList = ({ reservations, onReservationDeleted, onEdit}) => {

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

  return (
    <div className="mt-5">

      <h3 className="mb-3">Reservation List</h3>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Table</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {reservations.length > 0 ? (

            reservations.map((reservation) => (

              <tr key={reservation._id}>

                <td>{reservation.customerName}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phone}</td>

                <td>
                  {new Date(
                    reservation.reservationDate
                  ).toLocaleDateString()}
                </td>

                <td>{reservation.reservationTime}</td>

                <td>{reservation.numberOfGuests}</td>

                <td>{reservation.tableNumber}</td>

                <td>{reservation.status}</td>

                <td>
                 <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(reservation)}
                 >
                    Edit
                </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(reservation._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="9" className="text-center">
                No Reservations Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default ReservationList;