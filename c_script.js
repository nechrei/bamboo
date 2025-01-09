// JSON data with image URLs, descriptions, and prices
const imageData = [
    {
      "imageUrl": "WebsiteArts01/bamboopack04.png",
      "text": "Matcha Icecream",
      "price": "2.56 Bambucks\n5 Boopoints"
    },
    {
      "imageUrl": "WebsiteArts01/bamboopack05_01.png",
      "text": "Salt And Vinegar\nCrisps",
      "price": "2.99 Bambucks\n6 Boopoints"
    },
    {
      "imageUrl": "WebsiteArts01/bamboopack03.png",
      "text": "Choco Hazelnut\nCookies",
      "price": "3.26 Bambucks\n7 Boopoints"
    },
    {
      "imageUrl": "WebsiteArts01/bamboopack01.png",
      "text": "Matcha Crackers",
      "price": "3.59 Bambucks\n8 Boopoints"
    },
    {
      "imageUrl": "WebsiteArts01/bamboopack02.png",
      "text": "Matcha Milk",
      "price": "4.10 Bambucks\n10 Boopoints"
    }
];

// Function to handle home button click
function home() {
  window.location.href = 'index.html'; // Replace with your desired HTML page path
}

document.getElementById('homeBtn').addEventListener('click', home);

// Get the gallery element
const gallery = document.getElementById('gallery');

function loadImages() {
  gallery.innerHTML = ''; // Clear the gallery before adding new images

  // Loop through the image data and create image elements with text and price
  imageData.forEach(item => {
    // Create a container div for each image
    const container = document.createElement('div');
    container.classList.add('gallery-item'); // Add a class for styling

    // Create a new image element
    const img = document.createElement('img');
    img.src = item.imageUrl; // Set the source to the current image URL
    img.alt = "Gallery Image"; // Set alt text
    img.classList.add('gallery-image'); // Optional: Add a class for styling

    // Create a new div to hold both text and price
    const textAndPriceDiv = document.createElement('div');
    textAndPriceDiv.classList.add('galleryDesc');

    // Create a new text element for the description
    const text = document.createElement('pre');
    text.classList.add('image-text');
    text.textContent = item.text; // Set the text from the JSON

    // Create a new price element
    const price = document.createElement('pre');
    price.classList.add('price');
    price.textContent = item.price; // Set the price from the JSON

    // Append the text and price to the div
    textAndPriceDiv.appendChild(text);
    textAndPriceDiv.appendChild(price);

    // Append the image and text/price div inside the container div
    container.appendChild(img);
    container.appendChild(textAndPriceDiv);

    // Append the container div to the gallery
    gallery.appendChild(container);
  });
}

// Call the function to load images when the page is ready
window.onload = loadImages;

// Add click event listener to handle zoom effect
gallery.addEventListener('click', (event) => {
  if (event.target) {
    const imageContainer = event.target.closest('.gallery-item'); // Get the div container

    // Check if there's already a zoomed-in container
    const currentlyZoomed = document.querySelector('.gallery-item.zoomed');

    // If another container is zoomed in, zoom out of it
    if (currentlyZoomed && currentlyZoomed !== imageContainer) {
      document.getElementById('vignette').style.zIndex = "0";
      currentlyZoomed.classList.remove('zoomed');
      currentlyZoomed.style.flexDirection = "row"; // Reset text position
    }

    // If the clicked image is not already zoomed in, zoom it in
    if (!imageContainer.classList.contains('zoomed')) {
      imageContainer.classList.add('zoomed');
      document.getElementById('vignette').classList.add('show'); // Add vignette effect
      document.getElementById('vignette').style.zIndex = "5";
      imageContainer.style.flexDirection = "column"; // Reset text position
    } else {
      // If it is already zoomed in, unzoom it
      document.getElementById('vignette').classList.remove('show'); // Remove vignette effect
      imageContainer.classList.remove('zoomed');
      document.getElementById('vignette').style.zIndex = "0";
      imageContainer.style.flexDirection = "row"; // Reset text position
    }
  }
});
