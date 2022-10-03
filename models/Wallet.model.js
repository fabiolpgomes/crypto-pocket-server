const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema(
  {
    name: { type: String, required: true},

    owner: { type: Schema.Types.ObjectId, ref: "User" },
    crypto: [{ type: Schema.Types.ObjectId, ref: "CryptoCoin" }],
  },
  { timestamps: true }
);

const WalletModel = mongoose.model("Wallet", WalletSchema);

module.exports = WalletModel;
