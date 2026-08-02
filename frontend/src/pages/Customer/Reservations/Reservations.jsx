import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    createReservation,
    getAllReservations,
    checkSlotAvailability,
    updateReservation,
    deleteReservation,
} from "../../../services/reservationService";

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [searchHistory, setSearchHistory] = useState("");
    const [slotStatus, setSlotStatus] = useState(null);
    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        reservationDate: "",
        reservationSlot: "",
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

    const checkAvailability = async (date, slot) => {
        if (!date || !slot) return;

        try {
            const response = await checkSlotAvailability(date, slot);

            setSlotStatus(response.available);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const updatedForm = {
            ...formData,
            [e.target.name]: e.target.value,
        };

        setFormData(updatedForm);

        setSlotStatus(null);

        if (
            updatedForm.reservationDate &&
            updatedForm.reservationSlot
        ) {
            checkAvailability(
                updatedForm.reservationDate,
                updatedForm.reservationSlot
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (slotStatus === false) {
            toast.error(
                "Please select another available time slot."
            );
            return;
        }

        try {
            await createReservation(formData);

            toast.success("Reservation booked successfully!");

            setFormData({
                customerName: "",
                email: "",
                phone: "",
                reservationDate: "",
                reservationSlot: "",
                numberOfGuests: "",
                specialRequest: "",
            });

            setSlotStatus(null);

            fetchReservations();
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to book reservation."
            );
        }
    };
    const handleCancelReservation = async (reservation) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this reservation?"
        );

        if (!confirmCancel) return;

        try {

            await updateReservation(reservation._id, {
                ...reservation,
                status: "Cancelled",
            });

            toast.success(
                "Reservation cancelled successfully."
            );

            fetchReservations();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to cancel reservation."
            );

        }

    };
    const handleDeleteReservation = async (id) => {

        const confirmDelete = window.confirm(
            "Remove this reservation from history?"
        );

        if (!confirmDelete) return;

        try {

            await deleteReservation(id);

            toast.success(
                "Reservation removed successfully."
            );

            fetchReservations();

        } catch (error) {

            console.error(error);

            toast.error("Unable to remove reservation.");

        }

    };
    const canCancelReservation = (reservation) => {

        if (reservation.status !== "Pending") {
            return false;
        }

        const reservationDateTime = new Date(
            reservation.reservationDate
        );

        const slotStart =
            reservation.reservationSlot.split(" - ")[0];

        const [time, period] = slotStart.split(" ");

        let [hours, minutes] =
            time.split(":").map(Number);

        if (period === "PM" && hours !== 12) {
            hours += 12;
        }

        if (period === "AM" && hours === 12) {
            hours = 0;
        }

        reservationDateTime.setHours(hours);
        reservationDateTime.setMinutes(minutes);
        reservationDateTime.setSeconds(0);

        const now = new Date();

        const minutesRemaining =
            (reservationDateTime - now) / (1000 * 60);

        return minutesRemaining >= 30;
    };
    return (
        <div className="reservations-page ">

            <div
                className="container py-5"
                style={{ maxWidth: "1450px" }}
            >

                <h2 className="text-center text-white fw-bold mb-5">
                    📅 My Reservations
                </h2>

                <div className="row g-4">

                    {/* Reservation Form */}

                    {/* ===========================
      BOOK A TABLE
=========================== */}

                    <div className="col-lg-5">

                        <div
                            className="card shadow"
                            style={{
                                position: "sticky",
                                top: "90px",
                                borderRadius: "18px",
                            }}
                        >

                            <div className="card-header bg-primary text-white py-3">

                                <h4 className="mb-0 fw-bold">
                                    🍽️ Book a Table
                                </h4>

                                <small>
                                    Reserve your favourite dining slot
                                </small>

                            </div>

                            <div className="card-body p-3">

                                <form onSubmit={handleSubmit}>

                                    {/* Customer Name */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Customer Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required
                                        />

                                    </div>

                                    {/* Email */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="example@gmail.com"
                                            required
                                        />

                                    </div>

                                    {/* Phone */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            required
                                        />

                                    </div>

                                    {/* Date & Slot */}

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Reservation Date
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                name="reservationDate"
                                                value={formData.reservationDate}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split("T")[0]}
                                                required
                                            />

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Time Slot
                                            </label>

                                            <select
                                                className="form-select"
                                                name="reservationSlot"
                                                value={formData.reservationSlot}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">
                                                    Select Time Slot
                                                </option>

                                                <option>
                                                    12:00 PM - 01:00 PM
                                                </option>

                                                <option>
                                                    01:00 PM - 02:00 PM
                                                </option>

                                                <option>
                                                    02:00 PM - 03:00 PM
                                                </option>

                                                <option>
                                                    03:00 PM - 04:00 PM
                                                </option>

                                                <option>
                                                    06:00 PM - 07:00 PM
                                                </option>

                                                <option>
                                                    07:00 PM - 08:00 PM
                                                </option>

                                                <option>
                                                    08:00 PM - 09:00 PM
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                    {/* Slot Availability */}

                                    {formData.reservationDate &&
                                        formData.reservationSlot &&
                                        slotStatus !== null && (

                                            <div
                                                className={`alert ${slotStatus
                                                    ? "alert-success"
                                                    : "alert-danger"
                                                    } py-2`}
                                            >

                                                {slotStatus
                                                    ? "🟢 This time slot is available."
                                                    : "🔴 This time slot is fully booked."}

                                            </div>

                                        )}

                                    {/* Guests */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Number of Guests
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="numberOfGuests"
                                            value={formData.numberOfGuests}
                                            onChange={handleChange}
                                            min="1"
                                            placeholder="Enter number of guests"
                                            required
                                        />

                                    </div>

                                    {/* Special Request */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Special Request
                                        </label>

                                        <textarea
                                            rows="3"
                                            className="form-control"
                                            name="specialRequest"
                                            value={formData.specialRequest}
                                            onChange={handleChange}
                                            placeholder="Birthday celebration, Anniversary, Window seat..."
                                        />

                                    </div>

                                    <button
                                        className="btn btn-success w-100 py-2 fw-bold"
                                        disabled={slotStatus === false}
                                    >
                                        🍽️ Book Reservation
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                    {/* Reservation History */}


                    <div className="col-lg-7">

                        <div className="card shadow border-0">

                            <div className="card-header bg-success text-white py-3">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <h4 className="mb-0 fw-bold">
                                            📋 Reservation History
                                        </h4>

                                        <small>
                                            Showing {reservations.length} Reservation(s)
                                        </small>

                                    </div>

                                </div>

                            </div>

                            <div className="card-body">

                                {/* Search */}

                                <div className="mb-4">

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="🔍 Search reservation..."
                                        value={searchHistory}
                                        onChange={(e) =>
                                            setSearchHistory(e.target.value)
                                        }
                                    />

                                </div>

                                {reservations
                                    .filter((reservation) =>
                                        reservation.customerName
                                            .toLowerCase()
                                            .includes(searchHistory.toLowerCase())
                                    )
                                    .map((reservation) => (

                                        <div
                                            key={reservation._id}
                                            className="card border-0 shadow-sm mb-4"
                                            style={{
                                                borderRadius: "15px",
                                            }}
                                        >

                                            <div className="card-body">

                                                {/* Header */}

                                                <div className="d-flex justify-content-between">

                                                    <div className="d-flex">

                                                        {/* Avatar */}

                                                        <div
                                                            className="rounded-circle bg-primary text-white fw-bold d-flex justify-content-center align-items-center me-3"
                                                            style={{
                                                                width: "55px",
                                                                height: "55px",
                                                                fontSize: "22px",
                                                            }}
                                                        >
                                                            {reservation.customerName
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>

                                                        <div>

                                                            <h5 className="fw-bold mb-1">
                                                                {reservation.customerName}
                                                            </h5>

                                                            <small className="text-muted">

                                                                Reservation #

                                                                {reservation._id
                                                                    .slice(-6)
                                                                    .toUpperCase()}

                                                            </small>

                                                        </div>

                                                    </div>

                                                    {/* Status */}

                                                    <span
                                                        className={`badge ${reservation.status === "Pending"
                                                                ? "bg-warning text-dark"
                                                                : reservation.status === "Confirmed"
                                                                    ? "bg-success"
                                                                    : reservation.status === "Completed"
                                                                        ? "bg-primary"
                                                                        : reservation.status === "Cancelled"
                                                                            ? "bg-danger"
                                                                            : "bg-dark"
                                                            }`}
                                                    >
                                                        {reservation.status}
                                                    </span>

                                                </div>

                                                <hr />

                                                {/* Information */}

                                                <div className="row">

                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            Reservation Date
                                                        </small>

                                                        <div className="fw-semibold">

                                                            📅{" "}

                                                            {new Date(
                                                                reservation.reservationDate
                                                            ).toLocaleDateString("en-IN", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })}

                                                        </div>

                                                    </div>

                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            Time Slot
                                                        </small>

                                                        <div className="fw-semibold">

                                                            🕒{" "}

                                                            {reservation.reservationSlot ||
                                                                reservation.reservationTime}

                                                        </div>

                                                    </div>

                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            Guests
                                                        </small>

                                                        <div className="fw-semibold">

                                                            👥{" "}

                                                            {reservation.numberOfGuests}

                                                        </div>

                                                    </div>

                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            Booked On
                                                        </small>

                                                        <div className="fw-semibold">

                                                            {new Date(
                                                                reservation.createdAt
                                                            ).toLocaleDateString("en-IN", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })}

                                                        </div>

                                                    </div>

                                                </div>

                                                {/* Special Request */}

                                                <div
                                                    className="p-3 mt-2"
                                                    style={{
                                                        background: "#f8f9fa",
                                                        borderRadius: "10px",
                                                        borderLeft: "4px solid #0d6efd",
                                                    }}
                                                >

                                                    <strong>

                                                        💬 Special Request

                                                    </strong>

                                                    <div className="mt-2">

                                                        {reservation.specialRequest
                                                            ? reservation.specialRequest
                                                            : "No special requests."}

                                                    </div>

                                                </div>
                                                {/* Action Buttons */}
{/* Action Buttons */}

<div className="d-flex justify-content-end mt-3">

    {/* Pending Reservation */}

    {reservation.status === "Pending" && (

        canCancelReservation(reservation) ? (

            <button
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                    handleCancelReservation(reservation)
                }
            >
                ❌ Cancel Reservation
            </button>

        ) : (

            <button
                className="btn btn-secondary btn-sm"
                disabled
                title="Reservations can only be cancelled at least 30 minutes before reservation."
            >
                ⛔ Cancellation Closed
            </button>

        )

    )}

    {/* Remove from History */}

    {(reservation.status === "Completed" ||
      reservation.status === "Cancelled" ||
      reservation.status === "No Show") && (

        <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
                handleDeleteReservation(reservation._id)
            }
        >
            🗑 Remove from History
        </button>

    )}

</div>

                                            </div>

                                        </div>

                                    ))}

                                {reservations.length === 0 && (

                                    <div className="text-center py-5">

                                        <h5>No Reservations Found</h5>

                                    </div>

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