import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);

      setUser(response.data.user);

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="mb-3">
        <label className="form-label">Email</label>

        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>

        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Logging In..." : "Login"}
      </button>

      <div className="text-center mt-3">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </div>

    </form>
  );
}

export default LoginForm;