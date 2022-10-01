const mongoose = require("mongoose");

async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Successfully connected the Database", dbConnection.connection.name);
  } catch (error) {
    console.log("Error connection to database", error);
  }
}

module.exports = connect;
