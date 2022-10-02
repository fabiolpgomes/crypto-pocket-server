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
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    profilePic: {
      type: String,
      default:
        "https://cdn2.vectorstock.com/i/thumb-large/23/81/default-avatar-profile-icon-vector-18942381.jpg",
    },
    wallets: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
