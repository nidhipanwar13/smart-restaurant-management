import { FaShoppingCart, FaTag } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="menu-card h-100">

      {/* Food Image */}
      <img
        src={
          item.image
            ? item.image
            : "https://via.placeholder.com/400x250?text=No+Image"
        }
        alt={item.name}
        className="menu-card-image"
      />

      {/* Card Body */}
      <div className="menu-card-body">

        <h5>{item.name}</h5>

        <p className="menu-description">
          {item.description}
        </p>

        <div className="category">
          <FaTag className="me-2 text-warning" />
          {item.category}
        </div>

        <div className="menu-footer">

          <span className="price">
            ₹ {item.price}
          </span>

          <button
            className="btn btn-warning"
            onClick={handleAddToCart}
          >
            <FaShoppingCart className="me-2" />
            Add
          </button>

        </div>

      </div>

    </div>
  );
};

export default MenuCard;