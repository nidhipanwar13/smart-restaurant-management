import { useEffect, useState } from "react";
import { updateOrder } from "../../../services/orderService";
import { toast } from "react-toastify";

function EditOrderModal({ selectedOrder, onOrderUpdated }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (selectedOrder) {
      setCustomerName(selectedOrder.customerName);
      setCustomerPhone(selectedOrder.customerPhone);
      setTableNumber(selectedOrder.tableNumber);
      setStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateOrder(selectedOrder._id, {
        customerName,
        customerPhone,
        tableNumber,
        status,
      });

      toast.success("Order updated successfully");

      onOrderUpdated();

      document.getElementById("closeEditOrderModal").click();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order");
    }
  };

  return (
    <div
      className="modal fade"
      id="editOrderModal"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <form onSubmit={handleSubmit}>

            <div className="modal-header">
              <h5>Edit Order</h5>

              <button
                id="closeEditOrderModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">
                  Customer Name
                </label>

                <input
                  className="form-control"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Phone
                </label>

                <input
                  className="form-control"
                  value={customerPhone}
                  onChange={(e) =>
                    setCustomerPhone(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Table Number
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={tableNumber}
                  onChange={(e) =>
                    setTableNumber(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
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

            <div className="modal-footer">

              <button
                className="btn btn-warning"
                type="submit"
              >
                Update Order
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EditOrderModal;