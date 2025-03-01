const { DataTypes } = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.changeColumn("cron_history", "started_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.changeColumn("cron_history", "started_at", {
      type: DataTypes.DATE,
      allowNull: false,
    });
  },
};
