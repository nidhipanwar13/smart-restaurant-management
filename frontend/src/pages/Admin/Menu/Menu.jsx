import { useEffect, useState } from "react";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
} from "../../../services/menuService";

import MenuForm from "../../../components/admin/MenuForm";
import MenuTable from "../../../components/admin/MenuTable";
import "../../../assets/css/menu.css";
import { toast } from "react-toastify";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const data = await getAllMenuItems();
      setMenuItems(data.menuItems);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load menu items.");
    }
  };

  const handleSave = async (item) => {
    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, item);
        toast.success("Menu item updated successfully!");
      } else {
        await addMenuItem(item);
        toast.success("Menu item added successfully!");
      }

      setEditingItem(null);
      loadMenu();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    try {
      await deleteMenuItem(id);
      toast.success("Menu item deleted successfully!");
      loadMenu();
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete menu item.");
    }
  };

  return (
    <div className="menu-page">
      <div
        className="container py-5"
        style={{ maxWidth: "1450px" }}
      >
        {/* Header */}

        <div className="menu-header">

          <h1>🍽 Menu Management</h1>

          <p>
            Manage your restaurant menu with ease.
          </p>

        </div>

        {/* Menu Form */}

        <div className="menu-form-card">

          <MenuForm
            onSave={handleSave}
            editingItem={editingItem}
            onCancel={handleCancel}
          />

        </div>

        {/* Menu Table */}

        <div className="menu-table-card">

          <div className="table-title">

            <h4>Menu Items</h4>

            <p>
              Manage all available dishes and beverages.
            </p>

          </div>

          <MenuTable
            menuItems={menuItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>

      </div>
    </div>
  );
};

export default Menu;