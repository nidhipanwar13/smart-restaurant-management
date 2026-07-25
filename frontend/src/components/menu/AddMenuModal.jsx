import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { addMenuItem } from "../../services/menuService";

function AddMenuModal({ onMenuAdded }) {
  const closeButtonRef = useRef(null);

  // Initial Form State
  const initialFormData = {
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true,
  };

  // States
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Submit
  const handleSubmit = async () => {
    // Validation
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

      const response = await addMenuItem(formData);

      // Refresh Menu List
      onMenuAdded();

      // Reset Form
      setFormData(initialFormData);

      // Close Modal
      closeButtonRef.current.click();

      // Success Toast
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="addMenuModal"
      tabIndex="-1"
      aria-labelledby="addMenuModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="addMenuModalLabel">
              Add Menu Item
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form>
              {/* Item Name */}
              <div className="mb-3">
                <label className="form-label">Item Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter item name"
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                ></textarea>
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price</label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>

                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Starter">Starter</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="mb-3">
                <label className="form-label">Image URL</label>

                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </div>

              {/* Available */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label"
                  htmlFor="available"
                >
                  Available
                </label>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={closeButtonRef}
              disabled={loading}
            >
              Close
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                "Add Menu"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMenuModal;