import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AdminNavbar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/admin/dashboard">
          🍽 Smart Restaurant
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/dashboard">
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/menu">
                Menu
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/orders">
                Orders
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/reservations">
                Reservations
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/feedback">
                Feedback
              </NavLink>
            </li>

            <li className="nav-item ms-lg-3">
              <span className="navbar-text text-light">
                Welcome, <strong>{user?.name || "Admin"}</strong>
              </span>
            </li>

            <li className="nav-item ms-lg-3">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;