const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
// const fs = require("fs");


const homeRoutes = require('./routes/home');
const restaurantsRoutes = require('./routes/restaurants')

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

app.use('/', homeRoutes);
// app.use('/', restaurantsRoutes) Second router for restaurant page?

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    
    if (err.name === "ValidationError") {
        console.log(err.name);
        return res.status(statusCode).render("error", { err });
    }
    
    if (err.name === "CastError") {
        console.log(err.name);
        return res.status(statusCode).render("error", { err });
    }
    
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
})