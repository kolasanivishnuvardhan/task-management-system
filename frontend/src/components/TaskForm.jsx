import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  status: "Todo",
  priority: "Medium",
  dueDate: "",
};

const TaskForm = ({ onSubmit, selectedTask, onCancelEdit, loading }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selectedTask) {
      setForm({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        status: selectedTask.status || "Todo",
        priority: selectedTask.priority || "Medium",
        dueDate: selectedTask.dueDate ? selectedTask.dueDate.slice(0, 10) : "",
      });
      return;
    }

    setForm(initialForm);
  }, [selectedTask]);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isSuccess = await onSubmit({
      ...form,
      dueDate: form.dueDate || null,
    });

    if (!selectedTask && isSuccess) {
      setForm(initialForm);
    }
  };

  return (
    <section className="card">
      <h3>{selectedTask ? "Update Task" : "Create Task"}</h3>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
        />

        <div className="grid-two">
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />

        <div className="form-actions">
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Saving..." : selectedTask ? "Save changes" : "Add task"}
          </button>
          {selectedTask && (
            <button type="button" className="ghost-button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
