import { Navigate, Outlet } from "react-router-dom";

const CustomerRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "customer") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default CustomerRoute;