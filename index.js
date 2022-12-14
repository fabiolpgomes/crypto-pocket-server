const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./config/db.config");
dbConnection();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.REACT_APP_URI }));

const UsersRoute = require("./routes/users.routes");
app.use("/users", UsersRoute);

const WalletRoute = require("./routes/wallets.routes");
app.use("/wallets", WalletRoute);

const CryptoTradding = require("./routes/cryptocurrencie.routes");
app.use("/cryptotrade", CryptoTradding);
app.listen(Number(process.env.PORT), () => {
  console.log("Server up and running on port 4000");
});
