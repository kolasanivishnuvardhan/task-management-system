const Task = require("../models/Task");

const getTaskAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [totalTasks, doneTasks, todoTasks, inProgressTasks, priorityBreakdown] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, status: "Done" }),
      Task.countDocuments({ user: userId, status: "Todo" }),
      Task.countDocuments({ user: userId, status: "In Progress" }),
      Task.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$priority", count: { $sum: 1 } } },
      ]),
    ]);

    const pendingTasks = totalTasks - doneTasks;
    const completionPercentage = totalTasks > 0 ? Number(((doneTasks / totalTasks) * 100).toFixed(2)) : 0;

    const priorityMap = priorityBreakdown.reduce(
      (acc, item) => {
        acc[item._id] = item.count;
        return acc;
      },
      { Low: 0, Medium: 0, High: 0 }
    );

    return res.status(200).json({
      totalTasks,
      completedTasks: doneTasks,
      pendingTasks,
      completionPercentage,
      statusBreakdown: {
        Todo: todoTasks,
        "In Progress": inProgressTasks,
        Done: doneTasks,
      },
      priorityBreakdown: priorityMap,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getTaskAnalytics };
