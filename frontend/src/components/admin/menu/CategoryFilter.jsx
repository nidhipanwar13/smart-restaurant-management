function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="col-md-3">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Starter">Starter</option>
        <option value="Main Course">Main Course</option>
        <option value="Dessert">Dessert</option>
        <option value="Beverage">Beverage</option>
      </select>
    </div>
  );
}

export default CategoryFilter;