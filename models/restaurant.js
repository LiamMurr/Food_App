const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  location: { type: String, required: true },
  geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: false 
    },
    coordinates: {
        type: [Number],
        required: false
    }
},
  allergy_friendly: { type: [String], required: true },
  price: { type: String, enum: ["$", "$$", "$$$"], required: true },
  image: { type: String, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
