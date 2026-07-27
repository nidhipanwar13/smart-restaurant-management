import { deleteOrder } from "../../services/orderService";
import { toast } from "react-toastify";

function DeleteOrderModal({ selectedOrder, onOrderDeleted }) {

  const handleDelete = async () => {

    if (!selectedOrder) return;

    try {

      await deleteOrder(selectedOrder._id);

      toast.success("Order deleted successfully");

      onOrderDeleted();

      document.getElementById("closeDeleteOrderModal").click();

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete order");

    }
  };

  return (

    <div
      className="modal fade"
      id="deleteOrderModal"
      tabIndex="-1"
    >

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5 className="modal-title">
              Delete Order
            </h5>

            <button
              id="closeDeleteOrderModal"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            <p>
              Are you sure you want to delete this order?
            </p>

            {selectedOrder && (
              <>
                <strong>Customer:</strong> {selectedOrder.customerName}
                <br />
                <strong>Table:</strong> {selectedOrder.tableNumber}
              </>
            )}

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default DeleteOrderModal;