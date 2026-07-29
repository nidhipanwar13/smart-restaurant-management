import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function CustomerNavbar() {
  const navigate = useNavigate();

  const { logout, user } = useContext(AuthContext);
  const { cartItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/customer/home">
          🍽 Smart Restaurant
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#customerNavbar"
          aria-controls="customerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="customerNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/home">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/menu">
                Menu
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/cart">
                🛒 Cart ({cartItems.length})
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/orders">
                My Orders
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/reservations">
                Reservations
              </NavLink>
            </li>

            {/* NEW FEEDBACK MENU */}

            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/feedback">
                ⭐ Feedback
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/profile">
                Profile
              </NavLink>
            </li>

            <li className="nav-item ms-lg-3">
              <span className="navbar-text text-light">
                Hi, <strong>{user?.name || "Customer"}</strong>
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

export default CustomerNavbar;