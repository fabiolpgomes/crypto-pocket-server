const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema(
  {
    typeofwallet: [
      {
        type: String,
        required: true,
        enum: ["BASIC", "PLUS", "PREMIUM"],
        default: "BASIC",
      },
    ],
    owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
    crypto: [{ type: Schema.Types.ObjectId, ref: "CryptoCoin" }],
  },
  { timestamps: true }
);

const WalletModel = mongoose.model("Wallet", WalletSchema);

module.exports = WalletModel;
