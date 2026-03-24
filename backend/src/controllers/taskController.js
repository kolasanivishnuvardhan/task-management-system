const Task = require("../models/Task");

const prioritySortWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description: description || "",
      status: status || "Todo",
      priority: priority || "Medium",
      dueDate: dueDate || null,
    });

    return res.status(201).json({ task });
  } catch (error) {
    return next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);

    const query = { user: req.user._id };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const skip = (safePage - 1) * safeLimit;

    const sortDirection = sortOrder === "asc" ? 1 : -1;
    const sort = {};

    if (["createdAt", "dueDate", "title", "status"].includes(sortBy)) {
      sort[sortBy] = sortDirection;
      sort.createdAt = -1;
    } else if (sortBy === "priority") {
      const tasks = await Task.find(query).lean();

      tasks.sort((a, b) => {
        const first = prioritySortWeight[a.priority] || 0;
        const second = prioritySortWeight[b.priority] || 0;
        return sortDirection === 1 ? first - second : second - first;
      });

      const totalTasks = tasks.length;
      const totalPages = Math.max(Math.ceil(totalTasks / safeLimit), 1);
      const paginated = tasks.slice(skip, skip + safeLimit);

      return res.status(200).json({
        tasks: paginated,
        pagination: {
          totalTasks,
          totalPages,
          currentPage: safePage,
          pageSize: safeLimit,
        },
      });
    } else {
      sort.createdAt = -1;
    }

    const [tasks, totalTasks] = await Promise.all([
      Task.find(query).sort(sort).skip(skip).limit(safeLimit),
      Task.countDocuments(query),
    ]);

    return res.status(200).json({
      tasks,
      pagination: {
        totalTasks,
        totalPages: Math.max(Math.ceil(totalTasks / safeLimit), 1),
        currentPage: safePage,
        pageSize: safeLimit,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    return res.status(200).json({ task });
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    return res.status(200).json({ task });
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

const markTaskCompleted = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: "Done" },
      { new: true }
    );

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    return res.status(200).json({ task });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskCompleted,
};
