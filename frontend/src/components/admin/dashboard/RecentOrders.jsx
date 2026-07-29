function RecentOrders({ orders }) {
  return (
    <div className="card shadow-lg border-0 mt-4">

      <div className="card-header bg-dark text-white">
        <h4 className="mb-0">
          Recent Orders
        </h4>
      </div>

      <div className="table-responsive">

        <table className="table table-hover mb-0">

          <thead className="table-light">

            <tr>
              <th>Customer</th>
              <th>Table</th>
              <th>Status</th>
              <th>Total</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order._id}>

                <td>{order.customerName}</td>

                <td>{order.tableNumber}</td>

                <td>

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

                </td>

                <td>₹{order.totalAmount}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentOrders;