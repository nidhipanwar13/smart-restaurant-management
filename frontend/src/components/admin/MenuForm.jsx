import { useEffect, useState } from "react";

const initialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
  available: true,
};

const MenuForm = ({ onSave, editingItem, onCancel }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        ...editingItem,
        price: Number(editingItem.price),
      });
    } else {
      setFormData(initialState);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    if (!editingItem) {
      setFormData(initialState);
    }
  };

  return (
    <div className="menu-form-container">
      <div className="section-title">
        <h3>
          {editingItem ? "✏️ Edit Menu Item" : "➕ Add New Menu Item"}
        </h3>

        <p>
          Fill in the details below to manage your restaurant menu.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Item Name */}
          <div className="col-md-6 mb-4">
            <label className="form-label">
              Item Name
            </label>

            <input
              type="text"
              className="form-control modern-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>

          {/* Category */}
          <div className="col-md-6 mb-4">
            <label className="form-label">
              Category
            </label>

            <select
              className="form-select modern-input"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>

              <option value="Starter">
                Starter
              </option>

              <option value="Main Course">
                Main Course
              </option>

              <option value="Dessert">
                Dessert
              </option>

              <option value="Beverage">
                Beverage
              </option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="form-label">
            Description
          </label>

          <textarea
            rows="4"
            className="form-control modern-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter food description"
            required
          />
        </div>

        <div className="row">
          {/* Price */}
          <div className="col-md-4 mb-4">
            <label className="form-label">
              Price (₹)
            </label>

            <input
              type="number"
              min="0"
              step="1"
              className="form-control modern-input no-spinner"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          {/* Image */}
          <div className="col-md-8 mb-4">
            <label className="form-label">
              Image URL
            </label>

            <input
              type="text"
              className="form-control modern-input"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Available */}
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />

          <label className="form-check-label ms-2">
            Available for Customers
          </label>
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-success px-4"
          >
            {editingItem ? "Update Item" : "Add Item"}
          </button>

          {editingItem && (
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MenuForm;