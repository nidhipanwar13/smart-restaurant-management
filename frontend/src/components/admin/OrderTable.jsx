import {
    BsPerson,
    BsTelephone,
    BsCalendarDate,
    BsClock,
    BsCurrencyRupee,
    BsCardChecklist,
    BsChatLeftText,
    BsTrash,
} from "react-icons/bs";

//import "../../../assets/css/orderTable.css";

const OrderTable = ({
    orders,
    onStatusChange,
    onDelete,
}) => {
    if (orders.length === 0) {
        return (
            <div className="alert alert-warning text-center">
                No orders found.
            </div>
        );
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "pending";
            case "Preparing":
                return "preparing";
            case "Ready":
                return "ready";
            case "Served":
                return "served";
            default:
                return "";
        }
    };

    return (
        <div className="row">

            {orders.map((order) => (

                <div className="col-lg-12 mb-4" key={order._id}>

                    <div
                        className={`card order-card shadow-sm ${getStatusClass(
                            order.status
                        )}`}
                    >
                        <div className="card-body">

                            {/* ================= Header ================= */}

                            <div className="d-flex justify-content-between align-items-start">

                                <div>

                                    <span className="badge bg-dark fs-6 px-3 py-2">
                                        ORD-{order._id.slice(-5).toUpperCase()}
                                    </span>

                                    <h4 className="mt-2 mb-1">

                                        <BsPerson className="me-2 text-primary" />

                                        {order.customerName
                                            .split(" ")
                                            .map(
                                                word =>
                                                    word.charAt(0).toUpperCase() +
                                                    word.slice(1)
                                            )
                                            .join(" ")}

                                    </h4>

                                    <p className="text-muted mb-1">

                                        <BsTelephone className="me-2" />

                                        {order.customerPhone}

                                    </p>

                                </div>

                                <span
                                    className={`badge ${order.status === "Pending"
                                        ? "bg-warning text-dark"
                                        : order.status === "Preparing"
                                            ? "bg-primary"
                                            : order.status === "Ready"
                                                ? "bg-info text-dark"
                                                : "bg-success"
                                        }`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <hr />

                            {/* ================= Date ================= */}

                            <div className="mb-4 text-muted">

                                <BsCalendarDate className="me-2" />

                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}

                                <span className="mx-2">•</span>

                                <BsClock className="me-2" />

                                {new Date(order.createdAt)
                                    .toLocaleTimeString("en-IN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })
                                    .toUpperCase()}

                            </div>
                            {/* ================= Ordered Items ================= */}

                            <h6 className="fw-bold mb-3">

                                <BsCardChecklist className="me-2 text-warning" />

                                Ordered Items

                            </h6>

                            <div className="order-items mb-4">

                                {order.items.map((item) => (

                                    <div
                                        key={item._id}
                                        className="d-flex justify-content-between align-items-center border-bottom py-2"
                                    >

                                        <span>

                                            {item.menuItem?.name}

                                        </span>

                                        <span className="badge bg-light text-dark">

                                            Qty {item.quantity}

                                        </span>

                                    </div>

                                ))}

                            </div>

                            {/* ================= Total ================= */}

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <span className="fw-semibold">

                                    <BsCurrencyRupee className="me-2 text-success" />

                                    Total Amount

                                </span>

                                <h3 className="text-success fw-bold mb-0">

                                    ₹{order.totalAmount}

                                </h3>

                            </div>

                            {/* ================= Instructions ================= */}

                            {order.specialInstructions && (
                                <div className="instructions-box">

                                    <div className="fw-bold mb-2">

                                        <BsChatLeftText className="me-2" />

                                        Special Instructions

                                    </div>

                                    <p className="mb-0">
                                        {order.specialInstructions}
                                    </p>

                                </div>

                            )}

                            {/* ================= Footer ================= */}

                            <div className="row align-items-center">

                                <div className="col-md-6">

                                    <label className="fw-semibold mb-2">

                                        Update Status

                                    </label>

                                    <select
                                        className="form-select order-status-select"
                                        value={order.status}
                                        onChange={(e) =>
                                            onStatusChange(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option>Pending</option>
                                        <option>Preparing</option>
                                        <option>Ready</option>
                                        <option>Served</option>

                                    </select>

                                </div>

                                <div className="col-md-6 text-md-end mt-3 mt-md-0">

                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() =>
                                            onDelete(order._id)
                                        }
                                    >

                                        <BsTrash className="me-2" />

                                        Delete Order

                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            ))}

        </div>
    );
};

export default OrderTable;