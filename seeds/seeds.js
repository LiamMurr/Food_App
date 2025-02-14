// const mongoose = require("mongoose");
// const fs = require("fs");
// const Restaurant = require("../models/restaurant.js"); // Import Mongoose schema
// const testData = require('./restaurants.json');

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/food-finder")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));


// console.log(testData);

// // Insert data into MongoDB

// Restaurant.insertMany(testData)
//   .then(() => {
//     console.log("Restaurants added successfully!");
//     mongoose.connection.close(); // Close connection after insert
//   })
//   .catch((err) => console.error(err));
