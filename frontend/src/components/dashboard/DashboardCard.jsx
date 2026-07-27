import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaUtensils,
  FaClock,
} from "react-icons/fa";

function DashboardCard({ title, value, color }) {
  const getIcon = () => {
    switch (title) {
      case "Total Orders":
        return <FaShoppingCart size={40} />;
      case "Pending Orders":
        return <FaClock size={40} />;
      case "Menu Items":
        return <FaUtensils size={40} />;
      case "Revenue":
        return <FaMoneyBillWave size={40} />;
      default:
        return null;
    }
  };

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div
        className={`card border-0 bg-${color} text-white shadow-lg`}
        style={{
          borderRadius: "20px",
          transition: "0.3s",
          cursor: "pointer",
        }}
      >
        <div className="card-body d-flex justify-content-between align-items-center">

          <div>
            <h6 className="text-uppercase">{title}</h6>

            <h2 className="fw-bold mt-3">
              {value}
            </h2>
          </div>

          <div>{getIcon()}</div>

        </div>
      </div>
    </div>
  );
}

export default DashboardCard;