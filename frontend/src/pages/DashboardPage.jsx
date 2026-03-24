import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import AnalyticsPanel from "../components/AnalyticsPanel";
import HeaderBar from "../components/HeaderBar";
import Pagination from "../components/Pagination";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const defaultFilters = {
  search: "",
  status: "",
  priority: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  limit: 8,
};

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [taskLoading, setTaskLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchInput, setSearchInput] = useState("");

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        params.set(key, value);
      }
    });
    return params.toString();
  }, [filters]);

  const fetchTasks = useCallback(async () => {
    setTaskLoading(true);
    setError("");
    try {
      const { data } = await api.get(`/tasks?${queryParams}`);
      setTasks(data.tasks);
      setPagination(data.pagination);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to fetch tasks");
    } finally {
      setTaskLoading(false);
    }
  }, [queryParams]);

  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const { data } = await api.get("/analytics/tasks");
      setAnalytics(data);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to fetch analytics");
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const refreshAll = async () => {
    await Promise.all([fetchTasks(), fetchAnalytics()]);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (nextPage) => {
    if (!pagination || nextPage < 1 || nextPage > pagination.totalPages) return;
    setFilters((prev) => ({ ...prev, page: nextPage }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSearchInput("");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput.trim(), page: 1 }));
  };

  const handleSubmitTask = async (payload) => {
    setFormLoading(true);
    setError("");
    try {
      if (selectedTask) {
        await api.put(`/tasks/${selectedTask._id}`, payload);
      } else {
        await api.post("/tasks", payload);
      }
      setSelectedTask(null);
      await refreshAll();
      return true;
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to save task");
      return false;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      await refreshAll();
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to delete task");
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await api.patch(`/tasks/${taskId}/complete`);
      await refreshAll();
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to update task");
    }
  };

  return (
    <div className="dashboard-page">
      <HeaderBar />

      {error && <div className="error-banner">{error}</div>}

      <main className="dashboard-grid">
        <div className="left-column">
          <TaskForm
            onSubmit={handleSubmitTask}
            selectedTask={selectedTask}
            onCancelEdit={() => setSelectedTask(null)}
            loading={formLoading}
          />
          <TaskFilters
            filters={filters}
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            onSearchSubmit={handleSearchSubmit}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
          <TaskList
            tasks={tasks}
            loading={taskLoading}
            onEdit={setSelectedTask}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>

        <div className="right-column">
          <AnalyticsPanel analytics={analytics} loading={analyticsLoading} />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
