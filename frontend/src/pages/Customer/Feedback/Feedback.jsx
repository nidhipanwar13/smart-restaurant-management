import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  submitFeedback,
  getMyFeedback,
  updateFeedback,
  deleteFeedback,
} from "../../../services/feedbackService";

import "../../../assets/css/customerFeedback.css";

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [feedbackId, setFeedbackId] = useState("");

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await getMyFeedback();

      if (response.feedback) {
        setEditing(true);

        setFeedbackId(response.feedback._id);

        setFormData({
          rating: response.feedback.rating,
          comment: response.feedback.comment,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (value) => {
    setFormData({
      ...formData,
      rating: value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      comment: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!formData.comment.trim()) {
      toast.error("Please enter your feedback.");
      return;
    }

    try {
      if (editing) {
        await updateFeedback(feedbackId, formData);

        toast.success("Feedback updated successfully.");
      } else {
        await submitFeedback(formData);

        toast.success("Feedback submitted successfully.");

        setEditing(true);

        fetchFeedback();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your feedback?")) return;

    try {
      await deleteFeedback(feedbackId);

      toast.success("Feedback deleted.");

      setEditing(false);

      setFeedbackId("");

      setFormData({
        rating: 0,
        comment: "",
      });
    } catch (error) {
      toast.error("Unable to delete feedback.");
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="feedback-page">

      <div className="container">

        <h2 className="text-center text-white fw-bold mb-5">
          ⭐ Customer Feedback
        </h2>

        <div className="feedback-card">

          <h4 className="mb-4 text-center">

            {editing
              ? "Update Your Feedback"
              : "Share Your Experience"}

          </h4>

          <form onSubmit={handleSubmit}>

            <label className="form-label fw-bold">

              Rating

            </label>

            <div className="star-container mb-4">

              {[1, 2, 3, 4, 5].map((star) => (

                <span
                  key={star}
                  onClick={() =>
                    handleStarClick(star)
                  }
                  className={
                    star <= formData.rating
                      ? "star active"
                      : "star"
                  }
                >
                  ★
                </span>

              ))}

            </div>

            <div className="mb-4">

              <label className="form-label fw-bold">

                Feedback

              </label>

              <textarea
                rows="5"
                className="form-control"
                placeholder="Write your experience..."
                value={formData.comment}
                onChange={handleChange}
              />

            </div>

            <button
              className="btn btn-success w-100"
              type="submit"
            >

              {editing
                ? "Update Feedback"
                : "Submit Feedback"}

            </button>

            {editing && (

              <button
                type="button"
                className="btn btn-danger w-100 mt-3"
                onClick={handleDelete}
              >
                Delete Feedback
              </button>

            )}

          </form>

        </div>

      </div>

    </div>
  );
};

export default Feedback;