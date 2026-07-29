const OrderTable = ({
  orders,
  onStatusChange,
  onDelete,
}) => {
  if (orders.length === 0) {
    return (
      <div className="alert alert-warning text-center mt-3">
        No orders found.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {orders.map((order) => (
        <div
          className="col-lg-6"
          key={order._id}
        >
          <div
            className="card border-0 shadow-lg h-100"
            style={{
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            <div className="card-body">

              {/* Header */}

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                  <h5 className="fw-bold mb-1">
                    {order.customerName}
                  </h5>

                  <small className="text-muted">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </small>
                </div>

                <div className="text-end">
                  <h4 className="text-success fw-bold mb-0">
                    ₹ {order.totalAmount}
                  </h4>
                </div>

              </div>

              <hr />

              <div className="row gy-3">

                <div className="col-6">
                  <small className="text-muted">
                    Phone
                  </small>

                  <div className="fw-semibold">
                    {order.customerPhone}
                  </div>
                </div>

                <div className="col-6">
                  <small className="text-muted">
                    Table
                  </small>

                  <div className="fw-semibold">
                    {order.tableNumber}
                  </div>
                </div>

                <div className="col-6">
                  <small className="text-muted">
                    Items
                  </small>

                  <div>
                    <span className="badge bg-primary">
                      {order.items.length}
                    </span>
                  </div>
                </div>

                <div className="col-6">
                  <small className="text-muted">
                    Status
                  </small>

                  <select
                    className="form-select mt-1"
                    value={order.status}
                    onChange={(e) =>
                      onStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Preparing">
                      Preparing
                    </option>

                    <option value="Ready">
                      Ready
                    </option>

                    <option value="Served">
                      Served
                    </option>
                  </select>
                </div>

              </div>

              <hr />

              <div className="d-flex justify-content-end">

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    onDelete(order._id)
                  }
                >
                  Delete Order
                </button>

              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTable;