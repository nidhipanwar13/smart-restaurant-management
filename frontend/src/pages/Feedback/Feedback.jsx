import React, { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import { getAllFeedback } from "../../services/feedbackService";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchFeedback = async () => {
    try {
      const data = await getAllFeedback();
      setFeedbackList(data.feedback || []);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customer Feedback Management</h2>

      <FeedbackForm
        onFeedbackAdded={fetchFeedback}
        selectedFeedback={selectedFeedback}
        clearSelection={() => setSelectedFeedback(null)}
      />

      <FeedbackList
        feedbackList={feedbackList}
        onFeedbackDeleted={fetchFeedback}
        onEdit={setSelectedFeedback}
      />
    </div>
  );
};

export default Feedback;