const mapToken = maptilerApiKey;

// Configure the API key from global scope
maptilersdk.config.apiKey = mapToken;

// Create the map
const map = new maptilersdk.Map({
    container: 'map', // HTML container ID
    style: maptilersdk.MapStyle.BRIGHT,
    center: restaurant.geometry.coordinates, // starting position
    zoom: 10
});


