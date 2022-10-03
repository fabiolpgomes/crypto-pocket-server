const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
  
 
 
});
const CryptocurrencieModel = mongoose.model(
  "CryptoCoin",
  cryptocurrencieSchema
);
module.exports = CryptocurrencieModel;
