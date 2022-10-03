const express = require("express");
const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const CryptocurrencieModel = require("../models/CryptoCurrencie.model");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const router = express.Router();

router.post(
  "/purchasecoin/:idWallet",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { idWallet } = req.params;

      // axios pegando as informacoes da api de moedas.
      const loggedInUser = req.currentUser;

      const criatingCoin = await CryptocurrencieModel.create({
        nome: req.body.nome,
        aporte: Number(req.body.aporte),
        wallet: idWallet,
      });

      const walletSize = await WalletModel.findById(idWallet);
      if (
        walletSize.crypto.length > 3 &&
        loggedInUser.signatureType === "BASIC"
      ) {
        return res.status(400).json({
          erro: "Não é possível adicionar mais nenhuma moeda a essa carteira",
        });
      }
      const attachingToWallet = await WalletModel.findByIdAndUpdate(
        idWallet,
        {
          $push: { crypto: criatingCoin._id },
        },
        { new: true }
      );
      return res.status(200).json(attachingToWallet);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ erro: error });
    }
  }
);
module.exports = router;
