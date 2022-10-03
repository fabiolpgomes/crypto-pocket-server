const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    signatureType: {
      type: String,
      enum: ["BASIC", "PLUS", "PREMIUM"],
      default: "BASIC",
    },
    passwordHash: { type: String, required: true },
    emailConfirm: { type: Boolean, default: false },
    wallets: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
    profit: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
