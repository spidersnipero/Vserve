const mongoose = require("mongoose");

function connectToDB(dbName) {
  try {
    mongoose.connect("mongodb://localhost:27017/" + dbName, {
      useNewUrlParser: true,
    });
    mongoose.connection.once("open", () =>
      console.log(`Connected to the ${dbName} database `)
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDB;
