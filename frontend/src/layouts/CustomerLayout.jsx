import { Outlet } from "react-router-dom";
import CustomerNavbar from "../components/customer/CustomerNavbar";
import Footer from "../components/Common/Footer";

function CustomerLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <CustomerNavbar />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default CustomerLayout;