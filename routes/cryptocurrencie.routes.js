const express = require("express");

const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const CryptocurrencieModel = require("../models/CryptoCurrencie.model");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const router = express.Router();

router.post("/purchasecoin/:idWallet", async (req, res) => {
  try {



    
    const { idWallet } = req.params;
    const criatingCoin = await CryptocurrencieModel.create({
      ...req.body,
      nome: req.body.nome,
      aporte: req.body.aporte,
      wallet: idWallet,
    });
    const attachingToWallet = await WalletModel.findByIdAndUpdate(
      idWallet,
      {
        $push: { crypto: criatingCoin._id },
      },
      { new: true }
    );
    return res.status(200).json(attachingToWallet);
  } catch (error) {
    return res.status(400).json("CREDO");
  }
});
module.exports = router;
