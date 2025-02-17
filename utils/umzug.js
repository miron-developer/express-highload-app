const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

require("dotenv").config();

// Настроим подключение к базе
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

// Настроим Umzug
const umzug = new Umzug({
  migrations: {
    glob: "migrations/*.js",
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

module.exports = { umzug, sequelize };
