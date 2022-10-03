const express = require("express");
const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const CryptocurrencieModel = require("../models/CryptoCurrencie.model");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const router = express.Router();
const axios = require("axios");

router.post(
  "/purchasecoin/:idWallet",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const response = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=e8d1cfa6-a4a1-4cba-8253-5e925080d77a"
      );
      console.log(response.data);
      const { idWallet } = req.params;

      // axios pegando as informacoes da api de moedas.
      const loggedInUser = req.currentUser;

      const allCoins = response.data.data.map((element) => {
        return {
          nome_da_moeda: element.name,
          valor_moeda: element.quote.USD.price,
        };
      });
      const filtrandoCoin = allCoins.filter((element) => {
        return element.nome_da_moeda == req.body.cryptocurrencie;
      });
      const criatingCoin = await CryptocurrencieModel.create({
        cryptocurrencie: req.body.cryptocurrencie,
        balance: req.body.investment,
        investment: Number(req.body.investment),
        wallet: idWallet,
        priceAPI: filtrandoCoin[0].valor_moeda,
        totalCrypto: Number(
          Number(req.body.investment) / Number(filtrandoCoin[0].valor_moeda)
        ),
      });

        const walletSize = await WalletModel.findById(idWallet);
        if (
          walletSize.crypto.length > 3 &&
          loggerInUser.signatureType === "BASIC"
        ){
          return res.status(400).json({ message: "Its not possible to include more cryptocurrencie on this wallet "})
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
    return res.status(400).json({message: "Cryptocurrencie not inserted"});
  }
);
module.exports = router;
