const { DataTypes } = require("sequelize");

const { sequelize } = require("../utils/umzug");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10000,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
