import { Link } from "react-router-dom";
import "../../assets/css/landing.css";

function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-overlay">

        <div className="landing-content">

          <div className="landing-icon">
            🍽️
          </div>

          <h1 className="landing-title">
            Smart Restaurant
            <br />
            Management System
          </h1>

          <p className="landing-subtitle">
            Manage menu items, orders, reservations, customer feedback,
            and restaurant operations from one modern dashboard.
          </p>

          <div className="landing-buttons">
            <Link
              to="/login"
              className="btn btn-primary btn-lg px-5 me-3"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-outline-light btn-lg px-5"
            >
              Register
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Landing;