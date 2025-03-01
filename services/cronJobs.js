const cron = require("node-cron");
const os = require("os"); // Для получения имени сервера

const redis = require("./redis"); // Подключение к Redis
const tasks = require("./cronTasks");
const CronHistory = require("../models/cron_history");

const serverId = process.env.SERVER_ID || os.hostname(); // Или process.env.SERVER_ID, если используется Docker/K8s
const queueKey = "cron-task-queue";
const cronLockKeyBase = `cron-lock`;
const cronLockKey = `${cronLockKeyBase}:id`;

// Добавляем задачи в очередь, если их там нет
const initQueue = async () => {
  // FIXME: for test
  const keys = await redis.keys(`${cronLockKeyBase}:*`);
  if (keys.length > 0) {
    await redis.del(...keys); // Удаляем все найденные ключи
  }
  await redis.del(queueKey); // Чистим очередь (если надо)

  const existingTasks = await redis.lrange(queueKey, 0, -1);

  if (existingTasks.length === 0) {
    console.log("🔄 Наполняем очередь задач...");

    const taskNames = tasks.map((t) => t.name);
    for (const task of taskNames) {
      await redis.rpush(queueKey, task); // Добавляем задачи в очередь
    }
  }
};

// Функция забирает задачу из очереди и выполняет её
const runTask = async (task) => {
  const lockKey = cronLockKey.replace("id", task.name);
  const lock = await redis.set(lockKey, serverId, "NX", "EX", 130); // Блокировка на 2+ минуты

  if (!lock) {
    console.log(`🚫 [${taskName}] Уже выполняется в другой копии`);
    return;
  }

  console.log(`✅ [${task.name}] Запущена на сервере ${serverId}`);
  const startTime = new Date();

  try {
    const NewCronHistory = await CronHistory.create({
      task_name: task.name,
      status: "running",
      server_id: serverId,
      started_at: startTime,
    });

    await task.fn();

    await NewCronHistory.update({
      status: "success",
      finished_at: new Date(),
    });
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

  console.log(`🎯 [${task.name}] Завершена на сервере ${serverId}`);
  await redis.del(lockKey); // Разблокируем задачу
};

// Инициализация cron-задач
const initCronJobs = async () => {
  await initQueue();

  // Распределяем задачи пока не закончится
  while (true) {
    const taskName = await redis.lpop(queueKey); // Берём задачу из очереди

    const task = tasks.find((t) => t.name === taskName);
    if (!task) break;

    cron.schedule(task.interval, () => runTask(task));

    // await a little bit
    await new Promise((res, rej) => {
      setTimeout(res, 500);
    });
  }

  console.log("🕒 Cron-сервис запущен");
};
module.exports = { initCronJobs };
