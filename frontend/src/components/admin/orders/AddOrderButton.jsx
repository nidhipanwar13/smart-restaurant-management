function AddOrderButton() {
  return (
    <button
      className="btn btn-primary mb-3"
      data-bs-toggle="modal"
      data-bs-target="#addOrderModal"
    >
      + Place Order
    </button>
  );
}

export default AddOrderButton;