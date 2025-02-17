const { sequelize } = require("../utils/umzug");
// const logger = require("../utils/logger");

async function updateBalance(userId, amount) {
  const [updatedRows] = await sequelize.query(
    `
    UPDATE users 
    SET balance = balance + :amount 
    WHERE id = :userId AND balance + :amount >= 0
    RETURNING balance;
    `,
    {
      replacements: { userId, amount },
      type: sequelize.QueryTypes.UPDATE,
    }
  );

  if (!updatedRows.length) {
    // logger.warn(
    //   `Попытка списания ${amount} с пользователя ${userId} - недостаточно средств`
    // );
    throw new Error("Недостаточно средств на балансе");
  }

  // logger.info(
  //   `Баланс пользователя ${userId} изменён на ${amount}, новый баланс: ${updatedRows[0].balance}`
  // );
  return updatedRows[0].balance;
}

module.exports = { updateBalance };
