module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("users", {
      id: {
        type: "SERIAL",
        primaryKey: true,
        allowNull: false,
      },
      balance: {
        type: "INTEGER",
        allowNull: false,
        defaultValue: 10000,
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: new Date(),
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: new Date(),
      },
    });

    // Добавим одного пользователя
    await queryInterface.bulkInsert("users", [
      {
        balance: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("users");
  },
};
