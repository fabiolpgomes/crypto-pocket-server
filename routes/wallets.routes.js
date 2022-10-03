const express = require("express");

const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const CryptocurrencieModel = require("../models/CryptoCurrencie.model");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const router = express.Router();

router.post("/createwallet", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;
    if (loggedUser.wallets.length > 0 && loggedUser.signatureType === "BASIC") {
      return res.status(200).json({
        mensagem:
          "Você não pode adicionar mais nenhuma carteira com esse plano",
      });
    }
    const newWallet = await WalletModel.create({
      ...req.body,
      owner: loggedUser._id,
    });
    const walletAttachment = await UserModel.findByIdAndUpdate(
      loggedUser._id,
      { $push: { wallets: newWallet._id } },
      { new: true }
    );

    return res.status(201).json(walletAttachment);
  } catch (error) {
    console.log(error);
    return res.status(400).json("ERRO");
  }
});

// adicionar uma moeda a essa wallet

module.exports = router;
