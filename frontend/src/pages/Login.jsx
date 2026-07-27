import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="col-md-5">
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            <h2 className="text-center mb-4">
              🍽 Smart Restaurant
            </h2>

            <h4 className="text-center mb-4">
              Login
            </h4>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;