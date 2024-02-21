const mongoose = require("mongoose");
// Database connection
const mongodburl = "mongodb://localhost:27017/xybion";
mongoose.connect(mongodburl, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("Connected to database...");
});
