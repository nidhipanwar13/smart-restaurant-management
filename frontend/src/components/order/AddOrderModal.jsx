import { useState } from "react";
import { createOrder } from "../../services/orderService";
import { toast } from "react-toastify";

function AddOrderModal({ menuItems, onOrderAdded }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [menuItem, setMenuItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selected = menuItems.find(item => item._id === menuItem);

    if (!selected) {
      toast.error("Please select a menu item");
      return;
    }

    const total = selected.price * quantity;

    const orderData = {
      customerName,
      customerPhone,
      tableNumber,
      items: [
        {
          menuItem,
          quantity,
          price: selected.price
        }
      ],
      totalAmount: total,
      status: "Pending"
    };

    try {
      await createOrder(orderData);

      toast.success("Order placed successfully");

      onOrderAdded();

      document.getElementById("closeOrderModal").click();

      setCustomerName("");
      setCustomerPhone("");
      setTableNumber("");
      setMenuItem("");
      setQuantity(1);

    } catch (error) {
      toast.error("Failed to place order");
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="addOrderModal"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <form onSubmit={handleSubmit}>

            <div className="modal-header">
              <h5>Place Order</h5>
              <button
                id="closeOrderModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">

              <input
                className="form-control mb-2"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e)=>setCustomerName(e.target.value)}
                required
              />

              <input
                className="form-control mb-2"
                placeholder="Customer Phone"
                value={customerPhone}
                onChange={(e)=>setCustomerPhone(e.target.value)}
                required
              />

              <input
                className="form-control mb-2"
                type="number"
                placeholder="Table Number"
                value={tableNumber}
                onChange={(e)=>setTableNumber(e.target.value)}
                required
              />

              <select
                className="form-select mb-2"
                value={menuItem}
                onChange={(e)=>setMenuItem(e.target.value)}
                required
              >
                <option value="">Select Menu Item</option>

                {menuItems.map(item=>(
                  <option key={item._id} value={item._id}>
                    {item.name} - ₹{item.price}
                  </option>
                ))}

              </select>

              <input
                className="form-control"
                type="number"
                min="1"
                value={quantity}
                onChange={(e)=>setQuantity(Number(e.target.value))}
              />

            </div>

            <div className="modal-footer">
              <button className="btn btn-success">
                Place Order
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default AddOrderModal;