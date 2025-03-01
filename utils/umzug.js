const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

require("dotenv").config();

// Настроим подключение к базе
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT || "5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
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
