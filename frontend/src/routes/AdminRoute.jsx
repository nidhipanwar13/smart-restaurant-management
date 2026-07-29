import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminRoute() {
  const { user, loading } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  const role = user?.role || localStorage.getItem("role");

  console.log("AdminRoute -> token:", token);
  console.log("AdminRoute -> role:", role);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/customer/home" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;