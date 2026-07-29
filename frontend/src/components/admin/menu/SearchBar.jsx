function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="col-md-5">
      <input
        type="text"
        className="form-control"
        placeholder="Search menu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;