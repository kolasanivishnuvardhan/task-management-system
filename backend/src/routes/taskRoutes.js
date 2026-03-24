const express = require("express");
const { body, query, param } = require("express-validator");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskCompleted,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateMiddleware");

const router = express.Router();

const statusOptions = ["Todo", "In Progress", "Done"];
const priorityOptions = ["Low", "Medium", "High"];

router.use(protect);

router
  .route("/")
  .post(
    [
      body("title").trim().notEmpty().withMessage("Title is required"),
      body("status").optional().isIn(statusOptions).withMessage("Invalid status"),
      body("priority").optional().isIn(priorityOptions).withMessage("Invalid priority"),
      body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
    ],
    validate,
    createTask
  )
  .get(
    [
      query("status").optional().isIn(statusOptions).withMessage("Invalid status filter"),
      query("priority").optional().isIn(priorityOptions).withMessage("Invalid priority filter"),
      query("page").optional().isInt({ min: 1 }).withMessage("Page must be >= 1"),
      query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be 1-50"),
      query("sortBy")
        .optional()
        .isIn(["createdAt", "dueDate", "priority", "title", "status"])
        .withMessage("Invalid sortBy value"),
      query("sortOrder").optional().isIn(["asc", "desc"]).withMessage("Invalid sortOrder value"),
    ],
    validate,
    getTasks
  );

router.get("/:id", [param("id").isMongoId().withMessage("Invalid task id")], validate, getTaskById);

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid task id"),
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("status").optional().isIn(statusOptions).withMessage("Invalid status"),
    body("priority").optional().isIn(priorityOptions).withMessage("Invalid priority"),
    body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
  ],
  validate,
  updateTask
);

router.delete("/:id", [param("id").isMongoId().withMessage("Invalid task id")], validate, deleteTask);
router.patch(
  "/:id/complete",
  [param("id").isMongoId().withMessage("Invalid task id")],
  validate,
  markTaskCompleted
);

module.exports = router;
