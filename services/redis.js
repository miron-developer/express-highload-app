const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost", // Укажи свой хост, если Redis на другом сервере
  port: process.env.REDIS_PORT || 6379,
});

module.exports = redis;
