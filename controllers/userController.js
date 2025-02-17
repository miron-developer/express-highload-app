const { updateBalance } = require("../services/userService");

async function updateUserBalance(req, res) {
  try {
    const { userId, amount } = req.body;
    const newBalance = await updateBalance(userId, amount);
    return res.json({ userId, newBalance });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { updateUserBalance };
