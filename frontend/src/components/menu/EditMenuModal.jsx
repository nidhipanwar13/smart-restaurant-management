import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateMenuItem } from "../../services/menuService";

function EditMenuModal({
    selectedMenu,
    onMenuUpdated,
}) {

  const initialFormData = {
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (selectedMenu) {
      setFormData({
        name: selectedMenu.name || "",
        description: selectedMenu.description || "",
        price: selectedMenu.price || "",
        category: selectedMenu.category || "",
        image: selectedMenu.image || "",
        available: selectedMenu.available,
      });
    }
  }, [selectedMenu]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleUpdate = async () => {

    if (
        !formData.name ||
        !formData.description ||
        !formData.price ||
        !formData.category
    ) {
        toast.warning("Please fill all required fields.");
        return;
    }

    try {

        setLoading(true);

        await updateMenuItem(
            selectedMenu._id,
            formData
        );

        toast.success("Menu updated successfully!");

        onMenuUpdated();

        closeButtonRef.current.click();

    } catch (error) {

        console.error(error);

        toast.error("Failed to update menu.");

    } finally {

        setLoading(false);

    }

};

  return (
    <div
      className="modal fade"
      id="editMenuModal"
      tabIndex="-1"
      aria-labelledby="editMenuModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="editMenuModalLabel">
              Edit Menu Item
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Available
              </label>
            </div>

          </div>

          <div className="modal-footer">

           <button
    ref={closeButtonRef}
    className="btn btn-secondary"
    data-bs-dismiss="modal"
    disabled={loading}>
    Close
    </button>

            <button
    className="btn btn-warning"
    onClick={handleUpdate}
    disabled={loading}>
    {
    loading ?
    <>
    <span className="spinner-border spinner-border-sm me-2"></span>
    Updating...
    </>
    :
    "Update Menu"
    }
    </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EditMenuModal;