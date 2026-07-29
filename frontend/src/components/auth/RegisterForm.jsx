import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authService";

function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name,
        email,
        password,
      });

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Name
        </label>

        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
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
      <div className="mb-3">
        <label className="form-label fw-semibold">
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

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Confirm Password
        </label>

        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="btn btn-success w-100"
        disabled={loading}
        style={{
          height: "55px",
          fontSize: "18px",
          fontWeight: "600",
          borderRadius: "12px",
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Login Link */}
      <div className="text-center mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-decoration-none fw-bold"
        >
          Login
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;