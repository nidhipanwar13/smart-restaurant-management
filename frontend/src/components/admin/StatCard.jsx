const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="card stat-card shadow-sm border-0 h-100">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <small className="text-muted fw-semibold">
              {title}
            </small>

            <h2 className="fw-bold mt-2 mb-1">
              {value}
            </h2>

            <small className="text-muted">
              {subtitle}
            </small>

          </div>

          <div
            className="stat-icon"
            style={{
              backgroundColor: bgColor,
              color: iconColor,
            }}
          >
            <i className={icon}></i>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StatCard;