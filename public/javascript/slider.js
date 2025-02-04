"use strict";

let allRestaurants = []; // Global variable to store all restaurants

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

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  loadRestaurants().then(() => {
    setupAllergyFilter();
    setupScrolling();
  }).catch(error => console.error("Initialization failed:", error));
});