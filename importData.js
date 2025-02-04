const mongoose = require('mongoose');
const fs = require('fs');

const Restaurant = require('./models/restaurant');

mongoose.connect('mongodb://localhost:27017/food-finder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Read JSON file
const restaurants = JSON.parse(fs.readFileSync('restaurants.json', 'utf-8'));

// Import Data
const importData = async () => {
  try {
    await Restaurant.insertMany(restaurants);
    console.log('Data successfully imported!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing data:', error);
  }
};

importData();
