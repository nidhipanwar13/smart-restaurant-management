function MenuCard({ menu }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100">

        <img
          src={menu.image || "https://placehold.co/400x250?text=No+Image"}
          className="card-img-top"
          alt={menu.name}
          style={{ height: "220px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "https://placehold.co/400x250?text=No+Image";
          }}
        />

        <div className="card-body">

          <h4>{menu.name}</h4>

          <p>{menu.description}</p>

          <h5 className="text-success">
            ₹ {menu.price}
          </h5>

          <span className="badge bg-primary">
            {menu.category}
          </span>

          <br />
          <br />

          <span
            className={
              menu.available
                ? "badge bg-success"
                : "badge bg-danger"
            }
          >
            {menu.available ? "Available" : "Unavailable"}
          </span>

        </div>
      </div>
    </div>
  );
}

export default MenuCard;