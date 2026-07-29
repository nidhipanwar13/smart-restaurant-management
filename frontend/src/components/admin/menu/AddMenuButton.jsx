function AddMenuButton() {
  return (
    <>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addMenuModal"
      >
        + Add Menu
      </button>
    </>
  );
}

export default AddMenuButton;