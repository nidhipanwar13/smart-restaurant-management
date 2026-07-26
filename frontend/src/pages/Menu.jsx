import { useEffect, useState } from "react";

import MenuList from "../components/menu/MenuList";
import SearchBar from "../components/menu/SearchBar";
import CategoryFilter from "../components/menu/CategoryFilter";
import AddMenuButton from "../components/menu/AddMenuButton";
import AddMenuModal from "../components/menu/AddMenuModal";
import EditMenuModal from "../components/menu/EditMenuModal";
import DeleteMenuModal from "../components/menu/DeleteMenuModal";

import { getMenuItems } from "../services/menuService";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  // NEW STATE
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, [searchTerm, selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      const response = await getMenuItems(
        searchTerm,
        selectedCategory
      );

      setMenuItems(response.data.menuItems);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Menu Management</h2>
      </div>

      <div className="row mb-4">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <AddMenuButton />

      </div>

      <MenuList
        menuItems={menuItems}
        setSelectedMenu={setSelectedMenu}
      />

      <AddMenuModal
        onMenuAdded={fetchMenuItems}
      />

     <EditMenuModal
    selectedMenu={selectedMenu}
    onMenuUpdated={fetchMenuItems}
        />
        <DeleteMenuModal
    selectedMenu={selectedMenu}
    onMenuDeleted={fetchMenuItems}
        />

    </div>
  );
}

export default Menu;