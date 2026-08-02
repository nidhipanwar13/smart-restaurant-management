import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// Route Guards
import AdminRoute from "./routes/AdminRoute";
import CustomerRoute from "./routes/CustomerRoute";

// Public Pages
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Menu from "./pages/Admin/Menu/Menu";
import Orders from "./pages/Admin/Orders/Orders";
import Reservations from "./pages/Admin/Reservations/Reservations";
import Feedback from "./pages/Admin/Feedback/Feedback";

// Customer Pages
import Home from "./pages/Customer/Home/Home";
import CustomerMenu from "./pages/Customer/Menu/Menu";
import Cart from "./pages/Customer/Cart/Cart";
import Checkout from "./pages/Customer/Checkout/Checkout";
import CustomerOrders from "./pages/Customer/Orders/Orders";
import CustomerReservations from "./pages/Customer/Reservations/Reservations";
import Profile from "./pages/Customer/Profile/Profile";
import CustomerFeedback from "./pages/Customer/Feedback/Feedback";

function App() {
  return (
    <Routes>
      {/* ================= Public Routes ================= */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================= Admin Routes ================= */}

      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="menu"
            element={<Menu />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="reservations"
            element={<Reservations />}
          />

          <Route
            path="feedback"
            element={<Feedback />}
          />
        </Route>
      </Route>

      {/* ================= Customer Routes ================= */}

      <Route path="/customer" element={<CustomerRoute />}>
        <Route element={<CustomerLayout />}>
          <Route
            index
            element={<Navigate to="home" replace />}
          />

          <Route
            path="home"
            element={<Home />}
          />

          <Route
            path="menu"
            element={<CustomerMenu />}
          />

          <Route
            path="cart"
            element={<Cart />}
          />

          <Route
            path="checkout"
            element={<Checkout />}
          />

          <Route
            path="orders"
            element={<CustomerOrders />}
          />

          <Route
            path="reservations"
            element={<CustomerReservations />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
  path="feedback/:orderId"
  element={<CustomerFeedback />}
/>
        </Route>
      </Route>

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;