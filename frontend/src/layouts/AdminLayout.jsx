import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import Footer from "../components/Common/Footer";

function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AdminLayout;