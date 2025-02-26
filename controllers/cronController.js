const { Op } = require("sequelize");

const CronHistory = require("../models/cron_history");

const getCronTasks = async (req, res) => {
  try {
    const tasks = await CronHistory.findAll({
      where: { status: { [Op.in]: ["running", "pending"] } }, // Выполняющиеся и ожидающие
      order: [["started_at", "DESC"]],
    });

    const response = tasks.map((task) => ({
      task_name: task.task_name,
      server_id: task.server_id,
      status: task.status,
      started_at: task.started_at,
      time_elapsed:
        Math.round((Date.now() - new Date(task.started_at)) / 1000) + " сек",
    }));

    res.json(response);
  } catch (error) {
    console.error("Ошибка получения списка задач:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = { getCronTasks };
