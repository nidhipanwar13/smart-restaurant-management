import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getOrders } from "../../../services/orderService";

import "../../../assets/css/customerOrders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

const fetchOrders = async () => {
  try {
    const response = await getOrders();

    setOrders(response.orders || []);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to load orders."
    );
  } finally {
    setLoading(false);
  }
};

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "badge bg-warning text-dark";
      case "Preparing":
        return "badge bg-info";
      case "Ready":
        return "badge bg-primary";
      case "Served":
        return "badge bg-success";
      default:
        return "badge bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="customer-orders">
        <div className="container py-5" style={{ maxWidth: "1450px" }}>
          <div className="text-center text-white py-5">
            <div
              className="spinner-border text-light mb-3"
              role="status"
            ></div>

            <h4>Loading Orders...</h4>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="customer-orders">
        <div className="container py-5" style={{ maxWidth: "1450px" }}>
          <div className="text-center text-white py-5">
            <h3>No Orders Found</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-orders">
      <div className="container py-5" style={{ maxWidth: "1450px" }}>
        <h2 className="text-center text-white fw-bold mb-5">
          🍽 My Orders
        </h2>

        <div className="row g-4">
          {orders.map((order) => (
            <div className="col-lg-6" key={order._id}>
              <div className="order-card h-100">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="fw-bold">
                      Order #{order._id.slice(-6)}
                    </h5>

                    <p className="mb-1">
                      <strong>Customer:</strong> {order.customerName}
                    </p>
                  </div>

                  <span className={getStatusBadge(order.status)}>
                    {order.status}
                  </span>
                </div>

                <hr />

                {/* Items */}
                <h6 className="fw-bold text-primary mb-3">
                  🍽 Items Ordered
                </h6>

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
                        <h6 className="mb-1 fw-semibold">
                          {item.menuItem?.name || "Menu Item"}
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

                {/* Summary */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">
                    Total Items
                  </span>

                  <span>
                    {order.items.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <strong>Total Amount</strong>

                  <strong className="text-success fs-5">
                    ₹ {order.totalAmount}
                  </strong>
                </div>

                <div className="mt-3">
                  <small className="text-muted">
                    {new Date(order.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                    {" • "}
                    {new Date(order.createdAt).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </small>
                </div>

                {/* Give Feedback */}
                {order.status === "Served" && (
                  <div className="text-end mt-4">
                    <button
                      className="btn btn-warning fw-semibold"
                      onClick={() =>
                        navigate(`/customer/feedback/${order._id}`)
                      }
                    >
                      ⭐ Give Feedback
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;