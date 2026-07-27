import React, { useEffect, useState } from "react";
import ReservationForm from "../components/reservation/ReservationForm";
import ReservationList from "../components/reservation/ReservationList";
import { getAllReservations } from "../services/reservationService";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const fetchReservations = async () => {
    try {
      const data = await getAllReservations();
      setReservations(data.reservations || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="container mt-5">

      <ReservationForm
        selectedReservation={selectedReservation}
        onReservationAdded={fetchReservations}
        clearSelection={() => setSelectedReservation(null)}
      />

      <ReservationList
        reservations={reservations}
        onReservationDeleted={fetchReservations}
        onEdit={setSelectedReservation}
      />

    </div>
  );
};

export default Reservation;