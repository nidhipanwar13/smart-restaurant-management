import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "../../../assets/css/cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalAmount,
  } = useCart();

  return (
    <div className="cart-page" >
        <div className="container py-5">
      <h2 className="mb-4 text-white text-center">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-white">
          <h4>Your cart is empty.</h4>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/customer/menu")}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="card mb-3 shadow-sm"
            >
              <div className="card-body">

                <div className="row align-items-center">

                  <div className="col-md-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: "120px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="col-md-4">
                    <h5>{item.name}</h5>
                    <p>Price : ₹{item.price}</p>
                  </div>

                  <div className="col-md-3">

                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                    >
                      -
                    </button>

                    <span className="mx-3">
                      {item.quantity}
                    </span>

                    <button
                      className="btn btn-outline-success"
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <div className="col-md-2 text-end">

                    <h6>
                      ₹{item.price * item.quantity}
                    </h6>

                    <button
                      className="btn btn-sm btn-danger mt-2"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

          <div className="card shadow">
            <div className="card-body">

              <h4>Total : ₹{totalAmount}</h4>

              <button
                className="btn btn-success mt-3"
                onClick={() =>
                  navigate("/customer/checkout")
                }
              >
                Proceed to Checkout
              </button>

            </div>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Cart;