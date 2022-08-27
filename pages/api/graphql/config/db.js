const mongoose = require("mongoose");

const connect = async () => {
  mongoose.connect(process.env.DATABASE_URL);
  mongoose.connection.once("open", () => {
    console.log("😎 DATABASE CONNECTED");
  });
};

module.exports = connect;
