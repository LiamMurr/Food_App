async function loadRestaurants() {
  try {
    const response = await fetch('/public/js/restaurants.json');
    const restaurants = await response.json();

    const container = document.querySelector('.restaurants-container');


    restaurants.forEach(restaurant => {
      const restaurantCard = document.createElement('div');
      restaurantCard.classList.add('restaurant-card');

      restaurantCard.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}">
        <h2>${restaurant.name}</h2>
        <p class="one">${restaurant.cuisine} | ${restaurant.priceRange}</p>
        <p class="distance">5km away</p>
      `;

      container.appendChild(restaurantCard);
    });
  } catch (error) {
    console.error('Error loading the restaurant data:', error);
  }
}

function setupScrolling() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const container = document.querySelector('.restaurants-container');

  let scrollPosition = 0;
  const cardWidth = 320;

  nextBtn.addEventListener('click', () => {
    scrollPosition += cardWidth;
    container.style.transform = `translateX(-${scrollPosition}px)`;
  });

  prevBtn.addEventListener('click', () => {
    scrollPosition -= cardWidth;
    if (scrollPosition < 0) scrollPosition = 0;
    container.style.transform = `translateX(-${scrollPosition}px)`;
  });
}

window.onload = () => {
  loadRestaurants().then(() => {
    setupScrolling();
  });
};









const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

// // Initialize and add the map
// let map;

// async function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 }, // Set the desired center of the map
//     zoom: 8, // Set the zoom level
//   });
// }

// initMap();

// 'use strict';

// // Mobile menu functionality
// const menu = document.querySelector("#mobile-menu");
// const menuLinks = document.querySelector(".navbar__menu");

// menu.addEventListener("click", function () {
//   menu.classList.toggle("is-active");
//   menuLinks.classList.toggle("active");
// });

// // Initialize and add the map
// let map;
// let markers = []; // Array to track markers on the map

// // Restaurant data
// const restaurants = [
//   { name: "Gluten-Free Cafe", lat: -34.397, lng: 150.644, diet: ["gluten-free"] },
//   { name: "Vegan Diner", lat: -34.400, lng: 150.650, diet: ["vegan"] },
//   { name: "Low Sugar Bakery", lat: -34.390, lng: 150.640, diet: ["low-sugar", "gluten-free"] },
// ];

// async function initMap() {
//   // Initialize the map
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });

//   // Add initial markers (all restaurants)
//   addMarkers(restaurants);
// }

// // Function to add markers to the map
// function addMarkers(data) {
//   // Clear existing markers
//   markers.forEach((marker) => marker.setMap(null));
//   markers = [];

//   // Add new markers based on filtered data
//   data.forEach((restaurant) => {
//     const marker = new google.maps.Marker({
//       position: { lat: restaurant.lat, lng: restaurant.lng },
//       map: map,
//       title: restaurant.name,
//     });

//     // Optional: Add an info window
//     const infoWindow = new google.maps.InfoWindow({
//       content: `<h3>${restaurant.name}</h3>`,
//     });

//     marker.addListener("click", () => {
//       infoWindow.open(map, marker);
//     });

//     markers.push(marker);
//   });
// }

// // Event listener for checkboxes
// document.getElementById("filter-form").addEventListener("change", () => {
//   // Get selected filters
//   const selectedFilters = Array.from(
//     document.querySelectorAll('input[name="diet"]:checked')
//   ).map((input) => input.value);

//   // Filter restaurants based on selected filters
//   const filteredRestaurants = restaurants.filter((restaurant) =>
//     selectedFilters.every((filter) => restaurant.diet.includes(filter))
//   );

//   // Update markers on the map
//   addMarkers(filteredRestaurants);
// });

// // Call the initMap function to load the map
// initMap();
