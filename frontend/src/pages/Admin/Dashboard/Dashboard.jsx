import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboardService";
import { toast } from "react-toastify";
import "../../../assets/css/dashboard.css";

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
        <div className="dashboard-header mb-5">
          <h2>👋 Welcome Back, Admin</h2>
          <p>Manage your restaurant efficiently from one place.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <div className="card dashboard-card shadow-sm h-100">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Orders</h6>
                <h2 className="fw-bold">{dashboard.totalOrders}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card dashboard-card shadow-sm h-100">
              <div className="card-body text-center">
                <h6 className="text-muted">Pending Orders</h6>
                <h2 className="fw-bold">{dashboard.pendingOrders}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card dashboard-card shadow-sm h-100">
              <div className="card-body text-center">
                <h6 className="text-muted">Menu Items</h6>
                <h2 className="fw-bold">{dashboard.totalMenuItems}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card dashboard-card shadow-sm h-100">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Revenue</h6>
                <h2 className="fw-bold">₹{dashboard.totalRevenue}</h2>
              </div>
            </div>
          </div>

        </div>

        {/* Recent Orders */}
        <div className="card dashboard-table shadow-sm mt-5">

          <div className="card-header">
            <h5 className="mb-0">Recent Orders</h5>
          </div>

          <div className="table-responsive">

            <table className="table table-hover mb-0 align-middle">

              <thead className="table-light">
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Table</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {dashboard.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Orders Found
                    </td>
                  </tr>
                ) : (
                  dashboard.recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.customerName}</td>
                      <td>{order.customerPhone}</td>
                      <td>{order.tableNumber}</td>
                      <td>₹{order.totalAmount}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Pending"
                              ? "bg-warning text-dark"
                              : order.status === "Preparing"
                              ? "bg-primary"
                              : order.status === "Completed"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;