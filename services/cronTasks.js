const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SLEEP_TIME = 2 * 60 * 1000;

const tasks = [
  {
    name: "task1",
    interval: "*/3 * * * * *",
    fn: async () => {
      console.log(`[TASK1] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK1] Завершено`);
    },
  },
  {
    name: "task2",
    interval: "*/4 * * * * *",
    fn: async () => {
      console.log(`[TASK2] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK2] Завершено`);
    },
  },
  {
    name: "task3",
    interval: "*/5 * * * * *",
    fn: async () => {
      console.log(`[TASK3] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK3] Завершено`);
    },
  },
  {
    name: "task4",
    interval: "*/6 * * * * *",
    fn: async () => {
      console.log(`[TASK4] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK4] Завершено`);
    },
  },
  {
    name: "task5",
    interval: "*/7 * * * * *",
    fn: async () => {
      console.log(`[TASK5] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK5] Завершено`);
    },
  },
  {
    name: "task6",
    interval: "*/8 * * * * *",
    fn: async () => {
      console.log(`[TASK6] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK6] Завершено`);
    },
  },
  {
    name: "task7",
    interval: "*/9 * * * * *",
    fn: async () => {
      console.log(`[TASK7] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK7] Завершено`);
    },
  },
  {
    name: "task8",
    interval: "*/10 * * * * *",
    fn: async () => {
      console.log(`[TASK8] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK8] Завершено`);
    },
  },
  {
    name: "task9",
    interval: "*/11 * * * * *",
    fn: async () => {
      console.log(`[TASK9] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK9] Завершено`);
    },
  },
  {
    name: "task10",
    interval: "*/12 * * * * *",
    fn: async () => {
      console.log(`[TASK10] Начало выполнения`);
      await sleep(SLEEP_TIME);
      console.log(`[TASK10] Завершено`);
    },
  },
];

module.exports = tasks;
