const Redis = require("ioredis");

const redis = new Redis({
  host: "localhost", // Укажи свой хост, если Redis на другом сервере
  port: 6379,
});

module.exports = redis;
