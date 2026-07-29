import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getOrders } from "../../../services/orderService";

import "../../../assets/css/customerOrders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders.");
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
        <div
          className="container py-5"
          style={{ maxWidth: "1450px" }}
        >
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
        <div
          className="container py-5"
          style={{ maxWidth: "1450px" }}
        >
          <div className="text-center text-white py-5">
            <h3>No Orders Found</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-orders">
      <div
        className="container py-5"
        style={{ maxWidth: "1450px" }}
      >
        <h2 className="text-center text-white fw-bold mb-5">
          🍽 My Orders
        </h2>

        <div className="row g-4">
          {orders.map((order) => (
            <div
              className="col-lg-6"
              key={order._id}
            >
              <div className="order-card h-100">

                <div className="d-flex justify-content-between align-items-start">

                  <div>
                    <h5 className="fw-bold">
                      Order #{order._id.slice(-6)}
                    </h5>

                    <p className="mb-1">
                      <strong>Customer:</strong>{" "}
                      {order.customerName}
                    </p>

                    <p className="mb-0">
                      <strong>Table:</strong>{" "}
                      {order.tableNumber || "-"}
                    </p>
                  </div>

                  <span className={getStatusBadge(order.status)}>
                    {order.status}
                  </span>

                </div>

                <hr />

                <h6 className="fw-bold mb-3">
                  Items
                </h6>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹ {item.price}
                    </span>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between align-items-center">

                  <strong>Total</strong>

                  <strong className="text-success fs-5">
                    ₹ {order.totalAmount}
                  </strong>

                </div>

                <div className="mt-3">
                  <small className="text-muted">
                    {new Date(order.createdAt).toLocaleString()}
                  </small>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;