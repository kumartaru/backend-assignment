const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a new task in the specified organization
router.post("/organizations/:org_id/tasks", auth, async (req, res) => {
  const { task_name, description } = req.body;
  const { org_id } = req.params;
  try {
    const task = new Task({
      task_name,
      description,
      organization_id: org_id,
      created_by: req.user.userId,
    });
    await task.save();
    res.status(201).send("Task created");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all tasks in the specified organization
router.get("/organizations/:org_id/tasks", auth, async (req, res) => {
  const { org_id } = req.params;
  try {
    const tasks = await Task.find({ organization_id: org_id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
