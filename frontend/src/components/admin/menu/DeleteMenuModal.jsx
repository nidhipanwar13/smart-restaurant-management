import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { deleteMenuItem } from "../../../services/menuService";

function DeleteMenuModal({
  selectedMenu,
  onMenuDeleted,
}) {
  const [loading, setLoading] = useState(false);

  const closeButtonRef = useRef(null);

  const handleDelete = async () => {
    if (!selectedMenu) return;

    try {
      setLoading(true);

      await deleteMenuItem(selectedMenu._id);

      toast.success("Menu deleted successfully!");

      onMenuDeleted();

      closeButtonRef.current.click();

    } catch (error) {
      console.error(error);

      toast.error("Failed to delete menu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteMenuModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Delete Menu
            </h5>

            <button
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            <p>
              Are you sure you want to delete
            </p>

            <h5 className="text-danger">
              {selectedMenu?.name}
            </h5>

          </div>

          <div className="modal-footer">

            <button
              ref={closeButtonRef}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DeleteMenuModal;