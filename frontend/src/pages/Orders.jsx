import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";
import OrderList from "../components/order/OrderList";
import AddOrderButton from "../components/order/AddOrderButton";
import AddOrderModal from "../components/order/AddOrderModal";
import EditOrderModal from "../components/order/EditOrderModal";
import DeleteOrderModal from "../components/order/DeleteOrderModal";
import { getMenuItems } from "../services/menuService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await getMenuItems();
      setMenuItems(response.data.menuItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Orders</h2>

      <AddOrderButton />

      <OrderList
        orders={orders}
        setSelectedOrder={setSelectedOrder}
      />

      <AddOrderModal
        menuItems={menuItems}
        onOrderAdded={fetchOrders}
      />

      <EditOrderModal
        selectedOrder={selectedOrder}
        onOrderUpdated={fetchOrders}
      />

      <DeleteOrderModal
        selectedOrder={selectedOrder}
        onOrderDeleted={fetchOrders}
      />
    </div>
  );
}

export default Orders;