const express = require("express");
const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const CryptocurrencieModel = require("../models/CryptoCurrencie.model");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const router = express.Router();
const axios = require("axios");
const { findByIdAndUpdate } = require("../models/User.model");

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
router.get("/updatingcrypto/:idWallet", async (req, res) => {
  try {
    const { idWallet } = req.params;
    const walletUpdatedCoins = await CryptocurrencieModel.find({
      wallet: idWallet,
    });
    const response1 = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=e8d1cfa6-a4a1-4cba-8253-5e925080d77a"
    );

    const allCoins1 = response1.data.data.map((element) => {
      return {
        nome_da_moeda: element.name,
        valor_moeda: element.quote.USD.price,
      };
    });
    //////////////////////////

    console.log(walletUpdatedCoins);
    console.log(allCoins1);

    walletUpdatedCoins.forEach(async (coin) => {
      let apiFetching = allCoins1.filter((moeda) => {
        return moeda.nome_da_moeda == coin.cryptocurrencie;
      });
      await CryptocurrencieModel.findByIdAndUpdate(coin._id, {
        priceAPI: apiFetching[0].valor_moeda,
      });
    });

    return res.status(200).json({ message: "Dados atualizados com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});
router.get("/selling");
module.exports = router;
