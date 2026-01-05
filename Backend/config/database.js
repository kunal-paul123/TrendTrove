const mongoose = require("mongoose");

const mongoDb = async () => {
  await mongoose.connect(process.env.DB_URL).then((data) => {
    console.log("database connected");
  });
};

module.exports = mongoDb;
