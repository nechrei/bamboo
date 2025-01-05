const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let isScrolling = false;  // Prevents multiple scroll actions during the transition
let startY = 0;
let isTouching = false;
let threshold = 50;  // Minimum distance before registering a swipe

// Smooth scroll between sections
const scrollToSection = (index) => {
    if (isScrolling || index < 0 || index >= sections.length) return;

    isScrolling = true;

    // Remove active class from the previous section and add to the new one
    sections[currentIndex].classList.remove('active');
    currentIndex = index;
    sections[currentIndex].classList.add('active');

    // Scroll to the top of the new section
    sections[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',  // Align to the top of the section
        inline: 'nearest'
    });

    // Reset scrolling lock after the transition duration (match with CSS transition duration)
    setTimeout(() => {
        isScrolling = false;  // Re-enable scrolling after transition is complete
    }, 1000);  // Adjust this to match the transition time in CSS (1 second)
};

// Scroll detection logic for mouse wheel
const handleScroll = (e) => {
    // If a section is currently scrolling, don't allow further scrolling
    if (isScrolling) return;

    const currentSection = sections[currentIndex];
    const sectionHeight = currentSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;  // Total scroll position (viewport height + scrolled distance)

    // Check if the user has scrolled to the bottom of the current section
    if (scrollPosition >= sectionHeight + currentSection.offsetTop) {
        // User has reached the bottom of the section, enable scrolling to the next section
        if (e.deltaY > 0) {
            scrollToSection(currentIndex + 1);  // Scroll down
        }
    } else if (window.scrollY <= currentSection.offsetTop) {
        // User is at the top of the section, enable scrolling to the previous section
        if (e.deltaY < 0) {
            scrollToSection(currentIndex - 1);  // Scroll up
        }
    }
};

// Prevent scrolling if in the middle of a transition
const blockScroll = (e) => {
    if (isScrolling) {
        e.preventDefault();  // Prevent default scroll behavior
    }
};

// Handle touch drag events
const handleTouchStart = (e) => {
    if (isScrolling) return;
    startY = e.touches[0].clientY;
    isTouching = true;
};

// Handle touch move (replicating mouse wheel scroll)
const handleTouchMove = (e) => {
    if (!isTouching || isScrolling) return;

    const currentY = e.touches[0].clientY;
    const distance = startY - currentY;

    // Only trigger scroll lock if the swipe distance exceeds the threshold
    if (Math.abs(distance) > threshold) {
        // Check if we've reached the bottom or top of the section
        const currentSection = sections[currentIndex];
        const sectionHeight = currentSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;  // Total scroll position (viewport height + scrolled distance)

        if (scrollPosition >= sectionHeight + currentSection.offsetTop && distance > 0) {
            // Swiped down and at the bottom of the section, go to the next section
            scrollToSection(currentIndex + 1);
        } else if (window.scrollY <= currentSection.offsetTop && distance < 0) {
            // Swiped up and at the top of the section, go to the previous section
            scrollToSection(currentIndex - 1);
        }

        isTouching = false;  // Prevent further movement until transition is complete
    }
};

// Handle touch end
const handleTouchEnd = () => {
    isTouching = false;
};

// Event listeners for scroll and touch
window.addEventListener('wheel', handleScroll);
window.addEventListener('touchstart', handleTouchStart, { passive: true });
window.addEventListener('touchmove', handleTouchMove, { passive: true });
window.addEventListener('touchend', handleTouchEnd);

// Prevent scroll during transitions (with wheel and touchmove)
window.addEventListener('wheel', blockScroll, { passive: false });
window.addEventListener('touchmove', blockScroll, { passive: false });

// Activate the first section on page load
document.addEventListener('DOMContentLoaded', () => {
    sections[currentIndex].classList.add('active');

    // Scroll to the first section (even if it's already visible)
    sections[currentIndex].scrollIntoView({ behavior: 'smooth' });

    // Optionally, you can simulate scrolling up if needed
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);  // Slight delay to ensure the page loads and then scrolls up
});

// Get the button
const goToTopBtn = document.getElementById("goToTopBtn");
const learnmoreBtn = document.getElementById("learnmoreBtn");
const goToContactBtn = document.getElementById("gotoContactBtn");

// Function to hide all sections except the first one and scroll to the top
const goToTop = () => {
  // Deactivate all sections
  sections.forEach(section => section.classList.remove('active'));

  // Activate the first section
  sections[0].classList.add('active');
   currentIndex = 0;
   isScrolling = false;  // Prevents multiple scroll actions during the transition
   startY = 0;
   isTouching = false;
   threshold = 50;  // Minimum distance before registering a swipe
  // Scroll to the top
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const goToMembers = () => {
    // Deactivate all sections
    sections.forEach(section => section.classList.remove('active'));
  
    // Activate the first section
    sections[1].classList.add('active');
     currentIndex = 1;
     isScrolling = false;  // Prevents multiple scroll actions during the transition
     startY = 0;
     isTouching = false;
     threshold = 50;  // Minimum distance before registering a swipe
    // Scroll to the top
    sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
  };
  const goToContact = () => {
    // Deactivate all sections
    sections.forEach(section => section.classList.remove('active'));
  
    // Activate the first section
    sections[2].classList.add('active');
     currentIndex = 2;
     isScrolling = false;  // Prevents multiple scroll actions during the transition
     startY = 0;
     isTouching = false;
     threshold = 50;  // Minimum distance before registering a swipe
    // Scroll to the top
    sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
  };
// Show the button when the user scrolls down
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    goToTopBtn.classList.add("show");  // Show button
  } else {
    goToTopBtn.classList.remove("show");  // Hide button
  }
};

// Scroll to the top when the button is clicked
goToTopBtn.addEventListener("click", goToTop);
learnmoreBtn.addEventListener("click", goToMembers);
goToContactBtn.addEventListener("click", goToContact);

    // Function to check if the text contains a URL (http, https, www, or domains like .com, .org, etc.)
    function containsLink(text) {
        const urlPattern = /(\bhttps?:\/\/[^\s]+|www\.[^\s]+|\b[^\s]+(?:\.[a-z]{2,}){1,})/i;
        return urlPattern.test(text);
    }

    // Add an event listener for the form submission
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        // Get the values of the title and message fields
        const title = document.getElementById("title").value;
        const message = document.getElementById("message").value;
        
        // Check if either the title or the message contains a link
        if (containsLink(title) || containsLink(message)) {
            event.preventDefault();  // Prevent form submission
            document.getElementById("messageStatus").textContent = "⚠️ Please remove any links from the Title or Message!";
            document.getElementById("messageStatus").style.color = "red";
        } else {
            document.getElementById("messageStatus").textContent = "";
        }
    });

    // Go to Top button functionality
    document.getElementById("goToTopBtn").addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    

    function sendEmail() {
        // Get form data
        const title = document.getElementById('title').value;
        const message = document.getElementById('message').value;

        // Basic validation for no links (can expand as needed)
        if (message.includes('http') || message.includes('.com') || message.includes('www')) {
            alert('No links allowed in the message.');
            return false;
        }

        // Prepare the subject and body for the email
        const subject = encodeURIComponent('New Message: ' + title);
        const body = encodeURIComponent('Message: ' + message);

        // Define the recipient email address
        const email = 'mail.bamboopanda@gmail.com';

        // Create the mailto link
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

        // Open the email client with pre-filled information
        window.location.href = mailtoLink;

        // Prevent the form from submitting normally
        return false;
    }
    document.getElementById('sendButton').addEventListener('click', sendEmail);

    function creativity() {
        window.location.href = 'creativity.html'; // Replace with your desired HTML page path
    }

    document.getElementById('skipBtn').addEventListener('click', creativity);

