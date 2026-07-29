import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

import "../../assets/css/login.css";

function LoginForm() {
  const navigate = useNavigate();

  const { setUser, setToken } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    role: "customer",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.role ||
      !formData.email ||
      !formData.password
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      const { token, user, message } = response.data;

      // Save authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      // Update AuthContext
      setUser(user);
      setToken(token);

      toast.success(message || "Login Successful");

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/home");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div
        className="card login-card shadow p-4"
        style={{ width: "520px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            🍽 Smart Restaurant
          </h2>

          <p className="text-muted mb-0">
            Welcome back! Please login to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Login As */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              Login As
            </label>

            <div className="d-flex gap-4 mt-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="customer"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="customer"
                >
                  Customer
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="admin"
                >
                  Admin
                </label>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <div className="text-center mt-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-decoration-none fw-semibold"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;