import React, { useEffect, useState } from "react";
import {
  createFeedback,
  updateFeedback,
} from "../../services/feedbackService";

const FeedbackForm = ({
  onFeedbackAdded,
  selectedFeedback,
  clearSelection,
}) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    rating: "",
    feedback: "",
    visitDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (selectedFeedback) {
      setFormData({
        customerName: selectedFeedback.customerName,
        email: selectedFeedback.email,
        rating: selectedFeedback.rating,
        feedback: selectedFeedback.feedback,
        visitDate: selectedFeedback.visitDate
          ? selectedFeedback.visitDate.substring(0, 10)
          : "",
        status: selectedFeedback.status,
      });
    }
  }, [selectedFeedback]);

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
      rating: "",
      feedback: "",
      visitDate: "",
      status: "Pending",
    });

    clearSelection();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedFeedback) {
        await updateFeedback(selectedFeedback._id, formData);
      } else {
        await createFeedback(formData);
      }

      resetForm();
      onFeedbackAdded();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3">
          {selectedFeedback ? "Edit Feedback" : "Add Feedback"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row">

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

            <div className="col-md-4 mb-3">
              <label className="form-label">Rating</label>
              <select
                className="form-select"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">1 ⭐</option>
                <option value="2">2 ⭐⭐</option>
                <option value="3">3 ⭐⭐⭐</option>
                <option value="4">4 ⭐⭐⭐⭐</option>
                <option value="5">5 ⭐⭐⭐⭐⭐</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Visit Date</label>
              <input
                type="date"
                className="form-control"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Feedback</label>
              <textarea
                className="form-control"
                rows="4"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <button className="btn btn-primary me-2" type="submit">
            {selectedFeedback ? "Update Feedback" : "Submit Feedback"}
          </button>

          {selectedFeedback && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;