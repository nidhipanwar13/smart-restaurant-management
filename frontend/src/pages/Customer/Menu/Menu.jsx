import { useEffect, useMemo, useState } from "react";
import { getAllMenuItems } from "../../../services/menuService";
import MenuCard from "../../../components/customer/MenuCard";
import "../../../assets/css/customerMenu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);

      const response = await getAllMenuItems();

      const items = response.menuItems || [];

      // Only show available items to customers
      const availableItems = items.filter(
        (item) => item.available === true
      );

      setMenuItems(availableItems);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Dynamic Categories
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(menuItems.map((item) => item.category)),
    ];
  }, [menuItems]);

  // Filter Menu
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="customer-menu-page">
      <div className="container">

        {/* Header */}

        <div className="customer-menu-header">
          <h1>🍽 Restaurant Menu</h1>

          <p>
            Explore our delicious dishes prepared with love.
          </p>
        </div>

        {/* Search & Category */}

        <div className="menu-toolbar">

          <input
            type="text"
            className="form-control"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-center mt-5">
            <h4>Loading menu...</h4>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center mt-5">
            <h4>No menu items found.</h4>
          </div>
        ) : (
          <div className="row">

            {filteredItems.map((item) => (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={item._id}
              >
                <MenuCard item={item} />
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;