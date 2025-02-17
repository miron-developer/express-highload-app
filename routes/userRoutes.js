const express = require("express");

const { updateUserBalance } = require("../controllers/userController");
const validateRequest = require("../middlewares/validateRequest");
const balanceSchema = require("../validators/balanceValidator");

const router = express.Router();

router.post(
  "/update-balance",
  validateRequest(balanceSchema),
  updateUserBalance
);

module.exports = router;
