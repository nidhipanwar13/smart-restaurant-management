import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getOrders,
    updateOrder,
    deleteOrder,
} from "../../../services/orderService";

import OrderTable from "../../../components/admin/OrderTable";

import ordersBg from "../../../assets/images/orders-bg.jpg";
import "../../../assets/css/orders.css";

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
            setOrders(response.orders || []);
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

    // Order Counts
    const orderCounts = {
        All: orders.length,
        Pending: orders.filter((o) => o.status === "Pending").length,
        Preparing: orders.filter((o) => o.status === "Preparing").length,
        Ready: orders.filter((o) => o.status === "Ready").length,
        Served: orders.filter((o) => o.status === "Served").length,
    };

    // Filter Orders
    const filteredOrders = orders.filter((order) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
            order.customerName.toLowerCase().includes(keyword) ||
            order.customerPhone.includes(search) ||
            `ord-${order._id.slice(-5).toLowerCase()}`.includes(keyword);

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
                        Orders Management
                    </h2>

                    <p className="mb-0">
                        Search, track and update customer orders in real time.
                    </p>

                </div>

                {/* Toolbar */}

                <div className="card shadow-sm border-0 mb-4">

                    <div className="card-body">

             {/* Orders Summary */}

<div className="row g-4 mb-4">

    <div className="col-md-3">

        <div className="summary-card total-card">

            <i className="bi bi-receipt-cutoff fs-2"></i>

            <h3>{orderCounts.All}</h3>

            <p>Total Orders</p>

        </div>

    </div>

    <div className="col-md-3">

        <div className="summary-card pending-card">

            <i className="bi bi-hourglass-split fs-2"></i>

            <h3>{orderCounts.Pending}</h3>

            <p>Pending</p>

        </div>

    </div>

    <div className="col-md-3">

        <div className="summary-card preparing-card">

            <i className="bi bi-fire fs-2"></i>

            <h3>{orderCounts.Preparing}</h3>

            <p>Preparing</p>

        </div>

    </div>

    <div className="col-md-3">

        <div className="summary-card served-card">

            <i className="bi bi-check-circle fs-2"></i>

            <h3>{orderCounts.Served}</h3>

            <p>Served</p>

        </div>

    </div>

</div>           

                        {/* Search */}

                        <div className="mb-4">

                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="🔍 Search by customer, phone or Order ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                        {/* Status Buttons */}

                        <div className="d-flex flex-wrap gap-2">

                            {[
                                "All",
                                "Pending",
                                "Preparing",
                                "Ready",
                                "Served",
                            ].map((status) => (

                                <button
                                    key={status}
                                    className={`btn fw-semibold px-3 py-2 ${statusFilter === status
                                            ? status === "Pending"
                                                ? "btn-warning text-dark"
                                                : status === "Preparing"
                                                    ? "btn-primary"
                                                    : status === "Ready"
                                                        ? "btn-info text-dark"
                                                        : status === "Served"
                                                            ? "btn-success"
                                                            : "btn-dark"
                                            : "btn-outline-secondary"
                                        }`}
                                    onClick={() => setStatusFilter(status)}
                                >
                                    {status} ({orderCounts[status]})
                                </button>

                            ))}

                        </div>

                        {/* Showing Count */}

                        <div className="mt-3 text-muted">

                            Showing{" "}
                            <strong>
                                {filteredOrders.length}
                            </strong>{" "}
                            order(s)

                        </div>

                    </div>

                </div>

                {/* Orders */}

                {/* Orders */}

                <OrderTable
                    orders={filteredOrders}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                />

            </div>
        </div>
    );
};

export default Orders;