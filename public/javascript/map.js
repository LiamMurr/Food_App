'use strict';

// Restaurant Loading Function
async function loadRestaurants() {
  try {
    const response = await fetch("./restaurants.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const restaurants = await response.json();
    const container = document.querySelector(".restaurants-container");
    
    // Clear existing content
    container.innerHTML = '';

    restaurants.forEach((restaurant) => {
      const restaurantCard = document.createElement("div");
      restaurantCard.classList.add("restaurant-card");

      restaurantCard.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}">
        <h2>${restaurant.name}</h2>
        <p class="one">${restaurant.cuisine} | ${restaurant.priceRange}</p>
        <p class="distance">5km away</p>
      `;

      container.appendChild(restaurantCard);
    });

    return restaurants;
  } catch (error) {
    console.error("Error loading the restaurant data:", error);
    const container = document.querySelector(".restaurants-container");
    container.innerHTML = `<p>Unable to load restaurants. Please try again later.</p>`;
    throw error;
  }
}

// Scrolling Function
function setupScrolling() {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const container = document.querySelector(".restaurants-container");

  if (!prevBtn || !nextBtn || !container) {
    console.warn("Scrolling elements not found");
    return;
  }

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

// Mobile Menu Toggle
function setupMobileMenu() {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar__menu");

  if (menu && menuLinks) {
    menu.addEventListener("click", function () {
      menu.classList.toggle("is-active");
      menuLinks.classList.toggle("active");
    });
  }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();

  loadRestaurants()
    .then(() => {
      setupScrolling();
    })
    .catch(error => {
      console.error("Initialization failed:", error);
    });
});