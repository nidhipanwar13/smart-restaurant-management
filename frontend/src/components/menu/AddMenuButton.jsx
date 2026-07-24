function AddMenuButton() {

  const handleClick = () => {
    alert("Add Menu functionality will be implemented next.");
  };

  return (
    <div className="col-md-2">
      <button
        className="btn btn-success w-100"
        onClick={handleClick}
      >
        + Add Menu
      </button>
    </div>
  );
}

export default AddMenuButton;