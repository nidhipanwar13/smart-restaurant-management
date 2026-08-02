const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        reservationDate: {
            type: Date,
            required: true,
        },

        reservationSlot: {
            type: String,
            required: true,
        },

        numberOfGuests: {
            type: Number,
            required: true,
            min: 1,
        },

        specialRequest: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Completed",
                "Cancelled",
                "No Show",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reservation", reservationSchema);