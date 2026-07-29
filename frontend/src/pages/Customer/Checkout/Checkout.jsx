import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createOrder } from "../../../services/orderService";
import { useCart } from "../../../context/CartContext";

import "../../../assets/css/checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, totalAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    specialInstructions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderData = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      specialInstructions: formData.specialInstructions,

      items: cartItems.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price,
      })),

      totalAmount,
    };

    try {
      await createOrder(orderData);

      toast.success("Order placed successfully!");

      clearCart();

      navigate("/customer/orders");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="container-fluid px-5 checkout-page">
      <h2 className="mb-4 text-center text-white">Checkout</h2>

      <div className="row">

        {/* Customer Details */}

        <div className="col-lg-7">

          <form
            className="checkout-form"
            onSubmit={handlePlaceOrder}
          >

            <div className="mb-3">
              <label className="form-label">
                Customer Name
              </label>

              <input
                type="text"
                name="customerName"
                className="form-control"
                placeholder="Enter your name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Phone Number
              </label>

              <input
                type="text"
                name="customerPhone"
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Special Instructions
              </label>

              <textarea
                name="specialInstructions"
                className="form-control"
                rows="4"
                placeholder="Any special request? (Optional)"
                value={formData.specialInstructions}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100"
            >
              Place Order
            </button>

          </form>

        </div>

        {/* Order Summary */}

        <div className="col-lg-5">

          <div className="summary-card">

            <h4>Order Summary</h4>

            <hr />

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="d-flex justify-content-between mb-3"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  ₹ {item.price * item.quantity}
                </strong>

              </div>

            ))}

            <hr />

            <div className="d-flex justify-content-between">

              <h5>Total</h5>

              <h5 className="text-success">
                ₹ {totalAmount}
              </h5>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;