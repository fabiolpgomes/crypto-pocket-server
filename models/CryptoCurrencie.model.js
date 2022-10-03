const mongoose = require("mongoose");
const Schema = mongoose.Schema;
<<<<<<< HEAD
const cryptocurrencieSchema = new Schema(
  {
    cryptocurrencie: { type: String, required: true },
    balance: { type: Number },
    priceAPI: { type: Number },
    totalCrypto: { type: Number },
    investment: { type: Number },
    averagePrice: { type: Number },
    absoluteProfit: { type: Number },
    profitPercent: { type: Number },
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
    type: { type: String, enum: ["BUY", "SELL"] },
  },
  {
    timestamps: true,
  }
);
=======

const cryptocurrencieSchema = new Schema({
  nome: { type: String, required: true },
  saldo: { type: Number },
  precoAPI: { type: Number },
  totalMoedas: { type: Number },
  aporte: { type: Number },
  precoMedio: { type: Number },
  lucroAbsoluto: { type: Number },
  lucroPorcentagem: { type: Number },
  wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
}, {timestamps: true});
>>>>>>> c56acc142872371bd8925175d8d9b4718bcc844a

const CryptocurrencieModel = mongoose.model(
  "CryptoCoin",
  cryptocurrencieSchema
);

module.exports = CryptocurrencieModel;
