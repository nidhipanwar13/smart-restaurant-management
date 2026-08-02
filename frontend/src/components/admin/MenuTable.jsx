import React from "react";

const MenuTable = ({ menuItems, onEdit, onDelete }) => {
  if (menuItems.length === 0) {
    return (
      <div className="alert alert-warning mt-3 text-center">
        No menu items found.
      </div>
    );
  }

  return (
    <div className="table-responsive">

      <table className="table table-hover align-middle menu-table mb-0">

        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th width="170">Actions</th>
          </tr>
        </thead>

        <tbody>

          {menuItems.map((item, index) => (

            <tr key={item._id}>

              <td>{index + 1}</td>

              <td>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-image"
                  />
                ) : (
                  <span className="text-muted">
                    No Image
                  </span>
                )}
              </td>

              <td className="fw-semibold">
                {item.name}
              </td>

              <td>{item.description}</td>

              <td>{item.category}</td>

              <td className="fw-bold text-success">
                ₹ {item.price}
              </td>

              <td>
                {item.available ? (
                  <span className="badge bg-success">
                    Available
                  </span>
                ) : (
                  <span className="badge bg-danger">
                    Not Available
                  </span>
                )}
              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm  me-4 fw-semibold action-btn"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default MenuTable;