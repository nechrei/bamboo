
function home() {
    window.location.href = 'index.html'; // Replace with your desired HTML page path
}

document.getElementById('homeBtn').addEventListener('click', home);
// Array of image URLs
const imageUrls = [
  "WebsiteArts01/bamboopack01.png",
  "WebsiteArts01/bamboopack02.png",
  "WebsiteArts01/bamboopack03.png",
  "WebsiteArts01/bamboopack04.png"
];

// Get the gallery element
const gallery = document.getElementById('gallery');

// Function to load images into the gallery
function loadImages() {
  // Clear the gallery before adding new images
  gallery.innerHTML = '';

  // Loop through the image URLs and create image elements
  imageUrls.forEach(url => {
      // Create a container div for each image
      const container = document.createElement('div');
      container.classList.add('gallery-item');  // Add a class for styling

      // Create a new image element
      const img = document.createElement('img');
      img.src = url;  // Set the source to the current URL
      img.alt = "Gallery Image";  // Set alt text
      img.classList.add('gallery-image');  // Optional: Add a class for styling

      // Append the image inside the container div
      container.appendChild(img);

      // Append the container div to the gallery
      gallery.appendChild(container);
  });
}

// Call the function to load images when the page is ready
window.onload = loadImages;


gallery.addEventListener('click', (event) => {
  // Check if the clicked target is an image inside a gallery-item div
  if (event.target && event.target.tagName === 'IMG') {
      const imageContainer = event.target.closest('.gallery-item'); // Get the div container

      // Check if there's already a zoomed-in container
      const currentlyZoomed = document.querySelector('.gallery-item.zoomed');
      
      // If another container is zoomed in, zoom out of it
      if (currentlyZoomed && currentlyZoomed !== imageContainer) {
          currentlyZoomed.classList.remove('zoomed');
      }

      // If the clicked image is not already zoomed in, zoom it in
      if (!imageContainer.classList.contains('zoomed')) {
          imageContainer.classList.add('zoomed');
          document.getElementById('vignette').classList.add('show'); // Add vignette effect
      } else {
          // If it is already zoomed in, unzoom it
          document.getElementById('vignette').classList.remove('show'); // Remove vignette effect
          imageContainer.classList.remove('zoomed');
      }
  }
});
