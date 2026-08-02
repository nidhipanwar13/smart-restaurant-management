import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  submitFeedback,
  getFeedbackByOrder,
  updateFeedback,
  deleteFeedback,
} from "../../../services/feedbackService";

import { getOrderById } from "../../../services/orderService";

import "../../../assets/css/customerFeedback.css";

const Feedback = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [order, setOrder] = useState(null);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    fetchOrder();
    fetchFeedback();
  }, []);

  // ==============================
  // Load Order
  // ==============================

  const fetchOrder = async () => {
    try {
      const response = await getOrderById(orderId);

      setOrder(response.order);
    } catch (error) {
      toast.error("Unable to load order.");
    }
  };

  // ==============================
  // Load Existing Feedback
  // ==============================

  const fetchFeedback = async () => {
    try {
      const response = await getFeedbackByOrder(orderId);

      if (response.feedback) {
        setEditing(true);

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

  // ==============================
  // Rating
  // ==============================

  const handleStarClick = (value) => {
    setFormData({
      ...formData,
      rating: value,
    });
  };

  // ==============================
  // Comment
  // ==============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      comment: e.target.value,
    });
  };

  // ==============================
  // Submit / Update
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error("Please select rating.");
      return;
    }

    if (!formData.comment.trim()) {
      toast.error("Please write your feedback.");
      return;
    }

    try {
      if (editing) {
        await updateFeedback(orderId, formData);

        toast.success("Feedback updated successfully.");
      } else {
        await submitFeedback(orderId, formData);

        toast.success("Feedback submitted successfully.");

        setEditing(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  // ==============================
  // Delete
  // ==============================

  const handleDelete = async () => {
    if (!window.confirm("Delete feedback?")) return;

    try {
      await deleteFeedback(orderId);

      toast.success("Feedback deleted.");

      setEditing(false);

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
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        <h2 className="text-center text-white fw-bold mb-5">
          ⭐ Order Feedback
        </h2>

        <div className="feedback-card">

          {/* ==========================
              Order Details
          ========================== */}

          {order && (
            <>
              <div className="mb-4">

                <h5 className="fw-bold">
                  Order #{order._id.slice(-6)}
                </h5>

                <p className="text-muted mb-1">
                  {new Date(order.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>

                <span className="badge bg-success">
                  {order.status}
                </span>

              </div>

              <hr />

              <h5 className="fw-bold text-primary mb-3">
                🍽 Ordered Items
              </h5>

              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div className="d-flex align-items-center">

                    <img
                      src={item.menuItem?.image}
                      alt={item.menuItem?.name}
                      className="order-item-image me-3"
                    />

                    <div>
                      <h6 className="mb-1">
                        {item.menuItem?.name}
                      </h6>

                      <small className="text-muted">
                        Quantity : {item.quantity}
                      </small>
                    </div>

                  </div>

                  <strong>
                    ₹ {item.price * item.quantity}
                  </strong>

                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h5>Total Amount</h5>

                <h5 className="text-success">
                  ₹ {order.totalAmount}
                </h5>
              </div>
            </>
          )}

          {/* ==========================
              Feedback Form
          ========================== */}

          <form onSubmit={handleSubmit}>

            <label className="form-label fw-bold">
              Rating
            </label>

            <div className="star-container mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    star <= formData.rating
                      ? "star active"
                      : "star"
                  }
                  onClick={() =>
                    handleStarClick(star)
                  }
                >
                  ★
                </span>
              ))}
            </div>

            <div className="mb-4">

              <label className="form-label fw-bold">
                Your Feedback
              </label>

              <textarea
                rows="5"
                className="form-control"
                placeholder="Share your dining experience..."
                value={formData.comment}
                onChange={handleChange}
              />

            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
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

            <button
              type="button"
              className="btn btn-secondary w-100 mt-3"
              onClick={() =>
                navigate("/customer/orders")
              }
            >
              Back to Orders
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Feedback;