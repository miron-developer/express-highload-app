const cron = require("node-cron");
const os = require("os"); // Для получения имени сервера

const redis = require("./redis"); // Подключение к Redis
const tasks = require("./cronTasks");
const CronHistory = require("../models/cron_history");

const serverId = os.hostname(); // Или process.env.SERVER_ID, если используется Docker/K8s

// Функция запуска с логированием в БД
const runTask = async (task) => {
  const lockKey = `cron-lock:${task.name}`;
  const lock = await redis.set(lockKey, "locked", "NX", "EX", 130);

  if (lock) {
    console.log(`✅ [${task.name}] Запущена`);
    const startTime = new Date();

    try {
      await CronHistory.create({
        task_name: task.name,
        status: "running",
        server_id: serverId,
        started_at: startTime,
      });

      await task.fn();

      await CronHistory.update(
        { status: "success", finished_at: new Date() },
        {
          where: {
            task_name: task.name,
            status: "running",
            server_id: serverId,
          },
        }
      );
    } catch (err) {
      console.error(`❌ Ошибка в ${task.name}:`, err);
      await CronHistory.update(
        { status: "failed", finished_at: new Date() },
        {
          where: {
            task_name: task.name,
            status: "running",
            server_id: serverId,
          },
        }
      );
    }

    await redis.del(lockKey);
  } else {
    console.log(`🚫 [${task.name}] Уже выполняется в другой копии`);
  }
};

// Инициализация cron-задач
const initCronJobs = () => {
  console.log("🕒 Cron-сервис запущен");

  tasks.forEach((task) => {
    cron.schedule(task.interval, () => runTask(task));
  });
};

module.exports = { initCronJobs };
