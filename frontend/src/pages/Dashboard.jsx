import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import DashboardCard from "../components/dashboard/DashboardCard";
import RecentOrders from "../components/dashboard/RecentOrders";

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalMenuItems: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <h4 className="mt-3">
          Loading Dashboard...
        </h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        📊 Restaurant Dashboard
      </h2>

      <div className="row">

        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          color="primary"
        />

        <DashboardCard
          title="Pending Orders"
          value={stats.pendingOrders}
          color="warning"
        />

        <DashboardCard
          title="Menu Items"
          value={stats.totalMenuItems}
          color="success"
        />

        <DashboardCard
          title="Revenue"
          value={`₹${stats.totalRevenue}`}
          color="danger"
        />

      </div>

      <RecentOrders orders={stats.recentOrders} />

    </div>
  );
}

export default Dashboard;