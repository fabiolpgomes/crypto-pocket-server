const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Fala Brunão, tamo Juntos ");
});

app.listen(3000);
