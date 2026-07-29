import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getOrders,
  updateOrder,
  deleteOrder,
} from "../../../services/orderService";

import OrderTable from "../../../components/admin/OrderTable";

import ordersBg from "../../../assets/images/orders-bg.jpg";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrder(id, { status });

      toast.success("Order status updated");

      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update order");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      toast.success("Order deleted");

      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.customerPhone.includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="orders-page"
      style={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.50),
            rgba(0,0,0,0.50)
          ),
          url(${ordersBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        padding: "40px 0",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "1450px" }}
      >
        {/* Header */}

        <div className="orders-header text-center text-white mb-5">

          <h2 className="fw-bold">
            🧾 Orders Management
          </h2>

          <p className="mb-0">
            View and manage restaurant orders.
          </p>

        </div>

        {/* Toolbar */}

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body">

            <div className="row g-3 align-items-center">

              <div className="col-lg-8">

                <input
                  type="text"
                  placeholder="Search customer..."
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              <div className="col-lg-4">

                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Ready</option>
                  <option>Served</option>
                </select>

              </div>

            </div>

          </div>

        </div>

        {/* Orders Table */}

        <div className="card shadow border-0">

          <div className="card-body">

            <OrderTable
              orders={filteredOrders}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default Orders;