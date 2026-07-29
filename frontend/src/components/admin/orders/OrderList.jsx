import OrderCard from "./OrderCard";

function OrderList({ orders, setSelectedOrder }) {

  if (orders.length === 0) {
    return (
      <div className="alert alert-info">
        No Orders Found
      </div>
    );
  }

  return (
    <div className="row">

      {orders.map((order) => (

        <div
          className="col-md-6 mb-4"
          key={order._id}
        >

          <OrderCard
            order={order}
            setSelectedOrder={setSelectedOrder}
          />

        </div>

      ))}

    </div>
  );
}

export default OrderList;