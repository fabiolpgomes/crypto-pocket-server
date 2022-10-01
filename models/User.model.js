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
    signatureType: {      //Tipo de Assinatura: Basic, Plus ou Premium
      type: String,
      enum: ["BASIC", "PLUS", "PREMIUM"],
      default: "BASIC",
      wallet: [],
    },
    passwordHash: { type: String, required: true },
    emailConfirm: { type: Boolean, default: false },
    imgUrl: {
      type: String,
      default:
        "https://cdn2.vectorstock.com/i/thumb-large/23/81/default-avatar-profile-icon-vector-18942381.jpg",
      profilePic: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
