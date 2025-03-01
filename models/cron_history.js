const { DataTypes } = require("sequelize");

const { sequelize } = require("../utils/umzug");

const CronHistory = sequelize.define(
  "CronHistory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    task_name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    started_at: { type: DataTypes.DATE, allowNull: true },
    finished_at: { type: DataTypes.DATE, allowNull: true },
    server_id: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "cron_history",
    timestamps: false,
  }
);

module.exports = CronHistory;
