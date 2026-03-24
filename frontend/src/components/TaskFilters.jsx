const TaskFilters = ({
  filters,
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  onChange,
  onReset,
}) => {
  return (
    <section className="card">
      <h3>Filters & Search</h3>
      <div className="filters-grid">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <input
            name="search"
            placeholder="Search by title"
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.target.value)}
          />
          <button type="submit" className="primary-button">
            Enter
          </button>
        </form>

        <select name="status" value={filters.status} onChange={onChange}>
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select name="priority" value={filters.priority} onChange={onChange}>
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select name="sortBy" value={filters.sortBy} onChange={onChange}>
          <option value="createdAt">Sort by Created</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>

        <select name="sortOrder" value={filters.sortOrder} onChange={onChange}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>

        <button type="button" className="ghost-button" onClick={onReset}>
          Reset
        </button>
      </div>
    </section>
  );
};

export default TaskFilters;
