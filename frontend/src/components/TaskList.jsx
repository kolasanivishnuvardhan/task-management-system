import dayjs from "dayjs";

const TaskList = ({ tasks, loading, onEdit, onDelete, onComplete }) => {
  if (loading) {
    return <div className="card">Loading tasks...</div>;
  }

  if (!tasks.length) {
    return <div className="card">No tasks found.</div>;
  }

  return (
    <section className="card">
      <h3>Task List</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <article key={task._id} className="task-item">
            <div className="task-head">
              <h4>{task.title}</h4>
              <span className={`pill ${task.status.replace(" ", "-").toLowerCase()}`}>{task.status}</span>
            </div>
            <p>{task.description || "No description"}</p>
            <div className="task-meta">
              <span>Priority: {task.priority}</span>
              <span>Due: {task.dueDate ? dayjs(task.dueDate).format("DD MMM YYYY") : "-"}</span>
            </div>
            <div className="task-actions">
              <button className="ghost-button" onClick={() => onEdit(task)}>
                Edit
              </button>
              <button className="ghost-button danger" onClick={() => onDelete(task._id)}>
                Delete
              </button>
              {task.status !== "Done" && (
                <button className="primary-button" onClick={() => onComplete(task._id)}>
                  Mark Done
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TaskList;
