const express = require("express");
const { getTaskAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/tasks", protect, getTaskAnalytics);

module.exports = router;
