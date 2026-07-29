import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllFeedback,
  deleteFeedback,
} from "../../../services/feedbackService";

import "../../../assets/css/adminFeedback.css";

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    const filtered = feedbackList.filter((feedback) => {
      return (
        feedback.customerName
          ?.toLowerCase()
          .includes(keyword) ||
        feedback.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });

    setFilteredFeedback(filtered);
  }, [search, feedbackList]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);

      const response = await getAllFeedback();

      const feedback =
        response.feedback || response.feedbacks || [];

      feedback.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setFeedbackList(feedback);
      setFilteredFeedback(feedback);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFeedback(id);

      toast.success(
        "Feedback deleted successfully."
      );

      fetchFeedback();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete feedback.");
    }
  };

  const renderStars = (rating) => {
    return (
      <>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= rating
                ? "feedback-star active"
                : "feedback-star"
            }
          >
            ★
          </span>
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-light"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <div className="feedback-page">

      <div className="mb-4 text-center text-white">
        <h2 className="fw-bold display-6">
          💬 Customer Feedback
        </h2>

        <p className="lead">
          View and manage customer reviews.
        </p>
      </div>

      <div className="card shadow feedback-card">

        <div className="card-body">

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by customer or email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {filteredFeedback.length === 0 ? (
            <div className="text-center py-5">
              <h5>No Feedback Found</h5>
            </div>
          ) : (
            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Rating</th>
                    <th>Feedback</th>
                    <th>Date</th>
                    <th width="120">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredFeedback.map(
                    (feedback) => (
                      <tr key={feedback._id}>

                        <td className="fw-semibold">
                          {
                            feedback.customerName
                          }
                        </td>

                        <td>
                          {feedback.email}
                        </td>

                        <td>
                          {renderStars(
                            feedback.rating
                          )}
                        </td>

                        <td
                          style={{
                            maxWidth: "350px",
                          }}
                        >
                          {feedback.comment}
                        </td>

                        <td>
                          {new Date(
                            feedback.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                feedback._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Feedback;