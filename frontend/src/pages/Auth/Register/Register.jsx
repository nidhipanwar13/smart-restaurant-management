import RegisterForm from "../../../components/auth/RegisterForm";
import "../../../assets/css/login.css";

function Register() {
  return (
    <div className="login-page">
      <div
        className="card login-card shadow p-4"
        style={{ width: "550px" }}
      >
        <div className="text-center mb-4">
          <div style={{ fontSize: "52px" }}>
            🍽️
          </div>

          <h2 className="fw-bold mt-2">
            Smart Restaurant
          </h2>

          <p className="text-muted mb-0">
            Create your account to start your dining journey.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;