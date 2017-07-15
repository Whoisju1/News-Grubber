const express = require("express");
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

//connect to mongoose server
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/News-Grubber", {
    useMongoClient: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Mongoose connected successfully"));

//set view engine

app.listen(port, () => console.log(`Listening on PORT: ${port}`));
