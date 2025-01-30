const express = require('epxress');
const path = require("path");
const mongoose = require("mongoose");
const engine = require('ejs-mate')

const homeRoutes = require('./routes/home');



mongoose.connect('mongodb://127.0.0.1:27017/food-finder');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.listen(3000, () => {
    console.log('Serving on port 3000');
})