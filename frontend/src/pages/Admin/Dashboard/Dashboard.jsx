import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboardService";
import { toast } from "react-toastify";
import "../../../assets/css/dashboard.css";
import { Link } from "react-router-dom";
import {
    BsPerson,
    BsTelephone,
    BsCalendarDate,
    BsClock,
    BsCupHot,
    BsCurrencyRupee,
} from "react-icons/bs";
import StatCard from "../../../components/admin/StatCard";


function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const data = await getDashboardData();
            setDashboard(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-page d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div
                className="container py-5"
                style={{ maxWidth: "1450px" }}
            >
                {/* Header */}
                <div className="dashboard-header d-flex justify-content-between align-items-center mb-5">

                    <div>

                        <h2 className="fw-bold text-white">
                            👋 Welcome Back, Restaurant Admin!
                        </h2>

                        <p className="text-light mb-0">
                            Manage orders, reservations and customers from one place.
                        </p>

                    </div>

                    <div className="text-end">

                        <small className="text-light">
                            {new Date().toLocaleDateString("en-IN", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </small>

                    </div>

                </div>

                {/* Dashboard Cards */}
                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">

                        <StatCard
                            title="Total Orders"
                            value={dashboard.totalOrders}
                            subtitle="All customer orders"
                            icon="bi bi-bag-check-fill"
                            bgColor="#E8F1FF"
                            iconColor="#0d6efd"
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <StatCard
                            title="Pending Orders"
                            value={dashboard.pendingOrders}
                            subtitle="Need attention"
                            icon="bi bi-hourglass-split"
                            bgColor="#FFF6DB"
                            iconColor="#f0ad4e"
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <StatCard
                            title="Menu Items"
                            value={dashboard.totalMenuItems}
                            subtitle="Available dishes"
                            icon="bi bi-grid-fill"
                            bgColor="#E8F9EF"
                            iconColor="#198754"
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <StatCard
                            title="Revenue"
                            value={`₹${dashboard.totalRevenue}`}
                            subtitle="Total sales"
                            icon="bi bi-cash-stack"
                            bgColor="#FFECEC"
                            iconColor="#dc3545"
                        />

                    </div>

                </div>
                {/* Today's Activity */}

                <div className="mt-5">
                    <h4 className="fw-bold mb-4 text-white">
                        <i className="bi bi-bar-chart me-2"></i>
                        Order Status Overview
                    </h4>
                    <div className="row g-3">

                        <div className="col-md-3">

                            <div className="activity-card pending">

                                <h6>Pending</h6>

                                <h2>{dashboard.pendingOrders}</h2>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="activity-card preparing">

                                <h6>Preparing</h6>

                                <h2>{dashboard.preparingOrders}</h2>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="activity-card ready">

                                <h6>Ready</h6>

                                <h2>{dashboard.readyOrders}</h2>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="activity-card served">

                                <h6>Served</h6>

                                <h2>{dashboard.servedOrders}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Latest Orders */}

                <div className="mt-5">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold mb-4 text-white">
                            <i className="bi bi-receipt me-2"></i>
                            Latest Orders
                        </h4>                        <Link
                            to="/admin/orders"
                            className="btn btn-outline-primary btn-sm"
                        >
                            View All Orders →
                        </Link>
                    </div>

                    {dashboard.recentOrders.length === 0 ? (

                        <div className="alert alert-warning">
                            No recent orders found.
                        </div>

                    ) : (

                        <div className="row g-4">

                            {dashboard.recentOrders.map((order) => (

                                <div className="col-lg-6" key={order._id}>

                                    <div className="latest-order-card">

                                        {/* Header */}

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div className="d-flex align-items-center">

                                                <div className="customer-avatar me-3">

                                                    {order.customerName.charAt(0).toUpperCase()}

                                                </div>

                                                <div>

                                                    <h5 className="mb-1">

                                                        {order.customerName}

                                                    </h5>

                                                    <small className="text-muted">

                                                        <BsTelephone className="me-1" />

                                                        {order.customerPhone}

                                                    </small>

                                                </div>

                                            </div>

                                            <span
                                                className={`badge ${order.status === "Pending"
                                                    ? "bg-warning text-dark"
                                                    : order.status === "Preparing"
                                                        ? "bg-primary"
                                                        : order.status === "Ready"
                                                            ? "bg-info text-dark"
                                                            : "bg-success"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>

                                        </div>

                                        <hr />

                                        {/* Ordered Items */}

                                        <h6 className="mb-3 d-flex align-items-center">

                                            <BsCupHot className="me-2 text-warning" />

                                            Ordered Items

                                        </h6>

                                        <ul className="list-unstyled mb-3">

                                            {order.items.map((item) => (

                                                <li key={item._id}>
                                                    • {item.menuItem?.name} × {item.quantity}
                                                </li>

                                            ))}

                                        </ul>

                                        {/* Footer */}

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>
                                                <small className="text-muted">

                                                    Total Amount

                                                </small>

                                                <h5 className="fw-bold text-success d-flex align-items-center">

                                                    <BsCurrencyRupee className="me-1" />

                                                    {order.totalAmount}

                                                </h5>

                                            </div>

                                            <div className="text-end">

                                                <div
                                                    className="text-muted small d-flex align-items-center justify-content-end"
                                                >

                                                    <BsCalendarDate className="me-2" />

                                                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}

                                                </div>

                                                <div
                                                    className="text-muted small d-flex align-items-center justify-content-end"
                                                >

                                                    <BsClock className="me-2" />

                                                    {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    })}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


            </div>
        </div>
    );
}

export default Dashboard;