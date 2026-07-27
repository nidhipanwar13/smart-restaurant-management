import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Reservation from "./pages/Reservation";
import Feedback from "./pages/Feedback/Feedback";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reservations" element={<Reservation />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </>
  );
}

export default App;