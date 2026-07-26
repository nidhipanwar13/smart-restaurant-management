function MenuCard({ menu, setSelectedMenu }) {

  const handleEdit = () => {
    setSelectedMenu(menu);
  };

  const handleDelete = () => {
    setSelectedMenu(menu);
  };

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

        <div className="card-footer bg-white border-0">

          <div className="d-flex gap-2">

            <button
              className="btn btn-warning w-50"
              onClick={handleEdit}
              data-bs-toggle="modal"
              data-bs-target="#editMenuModal"
            >
              ✏️ Edit
            </button>

            <button
              className="btn btn-danger w-50"
              onClick={handleDelete}
              data-bs-toggle="modal"
              data-bs-target="#deleteMenuModal"
            >
              🗑 Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MenuCard;