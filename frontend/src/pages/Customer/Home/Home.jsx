import { Link } from "react-router-dom";
import "../../../assets/css/customerHome.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="customer-home">

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-overlay">

          <div className="container">

            <div className="hero-content">

              <span className="welcome-text">
                🍽️ Welcome to Smart Restaurant
              </span>

              <h1>
                Welcome Back,
                <br />
                <span>{user?.name || "Customer"} 👋</span>
              </h1>

              <p>
                Discover delicious food crafted with fresh ingredients,
                reserve your favorite table, and enjoy an unforgettable
                dining experience.
              </p>

              <div className="hero-buttons">

                <Link
                  to="/customer/menu"
                  className="btn btn-warning btn-lg"
                >
                  🍔 Explore Menu
                </Link>

                <Link
                  to="/customer/reservations"
                  className="btn btn-outline-light btn-lg"
                >
                  📅 Reserve Table
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;