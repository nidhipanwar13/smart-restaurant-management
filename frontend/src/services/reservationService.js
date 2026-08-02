import axios from "axios";

const API_URL = "http://localhost:5000/api/reservations";

// Create Reservation
export const createReservation = async (reservationData) => {
  const response = await axios.post(API_URL, reservationData);
  return response.data;
};

// Get All Reservations
export const getAllReservations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get Reservation By ID
export const getReservationById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update Reservation
export const updateReservation = async (id, reservationData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    reservationData
  );
  return response.data;
};

// Check Slot Availability
export const checkSlotAvailability = async (date, slot) => {
  const response = await axios.get(
    `${API_URL}/check-slot?date=${date}&slot=${encodeURIComponent(slot)}`
  );

  return response.data;
};

// Delete Reservation
export const deleteReservation = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};