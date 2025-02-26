const { DataTypes } = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn("cron_history", "server_id", {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn("cron_history", "server_id");
  },
};
