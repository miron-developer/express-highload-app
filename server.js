const express = require("express");
// const cluster = require("cluster");
// const os = require("os");

const userRoutes = require("./routes/userRoutes");
const cronRoutes = require("./routes/cronRoutes");
const { umzug, sequelize } = require("./utils/umzug");
const { initCronJobs } = require("./services/cronJobs");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/api", cronRoutes);

const PORT = process.env.PORT || 3000;

// Запускаем cron-задачи при старте сервера
initCronJobs();

// const numCPUs = os.cpus().length;

// Проверяем, если это мастер процесс
// if (cluster.isMaster) {
//   // Создаём рабочие процессы для каждого ядра
//   console.log(`Master process is running on PID: ${process.pid}`);
//   for (let i = 0; i < Math.round(numCPUs / 2); i++) {
//     cluster.fork(); // Создаём новый рабочий процесс
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
//   (async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connected to database");

//       await umzug.up();
//       console.log("Migrations executed");

//       app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();
// }

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");

    await umzug.up();
    console.log("Migrations executed");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error:", error);
  }
})();
