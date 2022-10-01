const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema(
  {
    wallet: [
      {
        type: String,
        required: true,
        enum: ["BASIC", "PLUS", "PREMIUM"],
        default: "BASIC",
      },
    ],
    crypto: [{ type: String }],
  },
  { timestamps: true }
);

const WalletModel = mongoose.model("Wallet", WalletSchema);

moduke.exports = WalletModel;
