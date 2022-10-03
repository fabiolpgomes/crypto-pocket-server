const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

const CryptocurrencieModel = mongoose.model(
  "CryptoCoin",
  cryptocurrencieSchema
);

module.exports = CryptocurrencieModel;
