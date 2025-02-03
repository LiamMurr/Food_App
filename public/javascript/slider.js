"use strict";

let map;
let markers = [];
let allRestaurants = []; // Global variable to store all restaurants

// Google Maps Initialization
function initMap() {
  const defaultLocation = { lat: -27.4698, lng: 153.0251 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: defaultLocation,
    zoom: 12,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  // Initially hide the map
  document.getElementById('map').style.display = 'none';
}

// Add Markers for Restaurants
function addRestaurantMarkers(restaurants) {
  if (!window.google || !window.google.maps) return;

  // Clear existing markers
  markers.forEach((marker) => marker.setMap(null));
  markers = [];

  restaurants.forEach((restaurant) => {
    if (restaurant.coordinates) {
      const marker = new google.maps.Marker({
        position: {
          lat: restaurant.coordinates.latitude,
          lng: restaurant.coordinates.longitude,
        },
        map: map,
        title: restaurant.name,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="map-info-window">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.cuisine} | ${restaurant.priceRange}</p>
            <p>Address: ${restaurant.address}</p>
            <div class="allergy-info">
              <strong>Allergy Specifications:</strong>
              <ul>
                ${Object.entries(restaurant.allergySpecifications)
                  .map(([key, value]) =>
                    `<li>${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}: 
                    ${value ? "Yes" : "No"}</li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    }
  });

  if (markers.length > 0) {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => bounds.extend(marker.getPosition()));
    map.fitBounds(bounds);
  }
}

// Restaurant Loading Function
async function loadRestaurants() {
  try {
    const response = await fetch("./restaurants.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const restaurants = await response.json();
    allRestaurants = restaurants;
    updateRestaurantDisplay(restaurants);

    if (window.google && window.google.maps) {
      addRestaurantMarkers(restaurants);
    }

    return restaurants;
  } catch (error) {
    console.error("Error loading the restaurant data:", error);
    document.querySelector(".restaurants-container").innerHTML = `<p>Unable to load restaurants. Please try again later.</p>`;
    throw error;
  }
}

// Filter Restaurants
function setupAllergyFilter() {
  const filterForm = document.getElementById("filter-form");

  filterForm.addEventListener("change", () => {
    const selectedDiets = Array.from(filterForm.querySelectorAll("input:checked")).map((input) => input.value);

    const filteredRestaurants = allRestaurants.filter((restaurant) => {
      if (selectedDiets.length === 0) return true;

      return selectedDiets.every((diet) => {
        switch (diet) {
          case "gluten-free":
            return restaurant.allergySpecifications.glutenFree;
          case "dairy-free":
            return restaurant.allergySpecifications.dairyFree;
          case "nut-free":
            return restaurant.allergySpecifications.nutFree;
          case "low-sugar":
            return restaurant.allergySpecifications.lowSugar;
          case "vegan":
            return restaurant.allergySpecifications.vegan;
          case "no-seafood":
            return restaurant.allergySpecifications.noSeafood;
          default:
            return false;
        }
      });
    });

    updateRestaurantDisplay(filteredRestaurants);
    if (window.google && window.google.maps) {
      addRestaurantMarkers(filteredRestaurants);
    }
  });
}

function updateRestaurantDisplay(restaurants) {
  const container = document.querySelector(".restaurants-container");
  container.innerHTML = "";

  restaurants.forEach((restaurant) => {
    const restaurantCard = document.createElement("div");
    restaurantCard.classList.add("restaurant-card");

    const allergySpecs = Object.entries(restaurant.allergySpecifications)
      .filter(([_, value]) => value)
      .map(([key]) => key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()))
      .join(", ");

    restaurantCard.innerHTML = `
      <img src="${restaurant.image}" alt="${restaurant.name}">
      <h2>${restaurant.name}</h2>
      <p class="one">${restaurant.cuisine} | ${restaurant.priceRange}</p>
      <p class="allergy-info">${allergySpecs || "No specific allergy options"}</p>
    `;

    container.appendChild(restaurantCard);
  });
}

// Scrolling Function
function setupScrolling() {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const container = document.querySelector(".restaurants-container");

  if (!prevBtn || !nextBtn || !container) return;

  let scrollPosition = 0;
  const scrollWidth = 1420;

  nextBtn.addEventListener("click", () => {
    scrollPosition += scrollWidth;
    container.style.transform = `translateX(-${scrollPosition}px)`;
  });

  prevBtn.addEventListener("click", () => {
    scrollPosition = Math.max(0, scrollPosition - scrollWidth);
    container.style.transform = `translateX(-${scrollPosition}px)`;
  });
}

// Map Toggle Function
function setupMapToggle() {
  const mapToggleBtn = document.getElementById("map-toggle-btn");
  const mapContainer = document.getElementById("map");

  if (!mapToggleBtn || !mapContainer) return;

  mapToggleBtn.addEventListener("click", () => {
    mapContainer.style.display = mapContainer.style.display === "none" ? "block" : "none";
    mapToggleBtn.textContent = mapContainer.style.display === "none" ? "Show Map" : "Hide Map";
  });
}

// Initialize Everything

document.addEventListener('DOMContentLoaded', () => {
  loadRestaurants().then(() => {
    setupAllergyFilter();
    setupScrolling();
    setupMapToggle();
  }).catch(error => console.error("Initialization failed:", error));
});
