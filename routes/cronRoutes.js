const express = require("express");

const { getCronTasks } = require("../controllers/cronController");

const router = express.Router();

router.get("/cron-tasks", getCronTasks);

module.exports = router;
