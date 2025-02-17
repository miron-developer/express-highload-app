const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(level, message) {
    this.emit("log", { level, message, timestamp: new Date().toISOString() });
  }
}

const logger = new Logger();

// Фоновый процесс для записи логов
logger.on("log", (log) => {
  setImmediate(() => {
    console.log(
      `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`
    );
  });
});

module.exports = logger;
