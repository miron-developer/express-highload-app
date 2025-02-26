const { UUIDV4, DataTypes, fn } = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("cron_history", {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      task_name: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false }, // success / failed
      started_at: { type: DataTypes.DATE, allowNull: false },
      finished_at: { type: DataTypes.DATE, allowNull: true },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn("NOW"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("cron_history");
  },
};
