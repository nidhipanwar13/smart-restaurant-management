function OrderCard({ order, setSelectedOrder }) {

  return (
    <div className="card shadow-sm h-100">

      <div className="card-body">

        <h5 className="card-title">
          {order.customerName}
        </h5>

        <p>
          <strong>Phone:</strong> {order.customerPhone}
        </p>

        <p>
          <strong>Table:</strong> {order.tableNumber}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`badge ${
              order.status === "Pending"
                ? "bg-warning text-dark"
                : order.status === "Preparing"
                ? "bg-info"
                : order.status === "Ready"
                ? "bg-primary"
                : "bg-success"
            }`}
          >
            {order.status}
          </span>
        </p>

        <p>
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>

        <hr />

        <h6>Items</h6>

        <ul className="list-group">
          {order.items.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{item.menuItem?.name}</span>

              <span>
                {item.quantity} × ₹{item.price}
              </span>
            </li>
          ))}
        </ul>

        <hr />

        <div className="d-flex gap-2">

          <button
            className="btn btn-warning w-50"
            onClick={() => setSelectedOrder(order)}
            data-bs-toggle="modal"
            data-bs-target="#editOrderModal"
          >
            Edit
          </button>

          <button
            className="btn btn-danger w-50"
            onClick={() => setSelectedOrder(order)}
            data-bs-toggle="modal"
            data-bs-target="#deleteOrderModal"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderCard;