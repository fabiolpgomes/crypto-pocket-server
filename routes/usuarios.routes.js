const express = require("express");
const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const CryptocurrencieModel = require("../models/CryptoCurrencie.model");
const router = express.Router();

router.post("/sing-up", async (req, res) => {
  try {
    const TestandoRoute = await UserModel.create({ ...req.body });
    return res.status(200).json(TestandoRoute);
  } catch (error) {
    return res.status(400).json("ERRO");
  }
});
module.exports = router;
