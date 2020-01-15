const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/config.env" });

const dbUrl = process.env.MONGO_URI;

const db = async () => {
  try {
    const connection = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = db;
