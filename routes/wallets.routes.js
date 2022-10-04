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
    if (
      (loggedUser.wallets.length > 0 && loggedUser.signatureType === "BASIC") ||
      (loggedUser.wallets.length > 1 && loggedUser.signatureType === "PLUS")
    ) {
      return res.status(200).json({
        erro: "You cannot add any more wallets with this plan",
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

    return res.status(201).json({ message: "Wallet created with success" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to create a new wallet" });
  }
});
router.put("/editwallet/:idWallet", async (req, res) => {
  try {
    const { idWallet } = req.params;
    const editingWallet = await WalletModel.findByIdAndUpdate(idWallet, {
      ...req.body,
      name: req.body.name,
    });
    return res.status(200).json({ message: "Wallet edited" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error at changing data of wallet" });
  }
});

router.get("/getallwallets", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;
    const walletsTotal = await UserModel.find({ _id: loggedUser._id }).populate(
      "wallets"
    );
    return res.status(200).json({ walletsTotal });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Erro at fetching all wallets" });
  }
});
router.get("/getonewallet/:idwallet", async (req, res) => {
  try {
    const { idwallet } = req.params;
    const specificWallet = await WalletModel.findById(idwallet).populate(
      "crypto"
    );
    return res.status(200).json({ specificWallet });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error at accessing data of the wallet" });
  }
});
// adicionar uma moeda a essa wallet

module.exports = router;
