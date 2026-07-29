import React from "react";
import { deleteFeedback } from "../../../services/feedbackService";

const FeedbackList = ({
  feedbackList,
  onFeedbackDeleted,
  onEdit,
}) => {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFeedback(id);
      onFeedbackDeleted();
    } catch (error) {
      console.error(error);
      alert("Failed to delete feedback");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Reviewed":
        return <span className="badge bg-primary">Reviewed</span>;

      case "Resolved":
        return <span className="badge bg-success">Resolved</span>;

      default:
        return <span className="badge bg-warning text-dark">Pending</span>;
    }
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        <h4 className="mb-3">Feedback List</h4>

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Feedback</th>
                <th>Visit Date</th>
                <th>Status</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>

              {feedbackList.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Feedback Available
                  </td>
                </tr>
              ) : (
                feedbackList.map((item, index) => (
                  <tr key={item._id}>

                    <td>{index + 1}</td>

                    <td>{item.customerName}</td>

                    <td>{item.email}</td>

                    <td>{renderStars(item.rating)}</td>

                    <td>{item.feedback}</td>

                    <td>
                      {new Date(item.visitDate).toLocaleDateString()}
                    </td>

                    <td>{getStatusBadge(item.status)}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default FeedbackList;