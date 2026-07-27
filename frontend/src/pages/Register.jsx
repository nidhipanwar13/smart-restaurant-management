import RegisterForm from "../components/auth/RegisterForm";

function Register() {
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
              Register
            </h4>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;