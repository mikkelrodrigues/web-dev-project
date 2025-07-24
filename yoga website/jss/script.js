// --- Global Functions for HTML onclick attributes ---

// Scrolls the page to the top smoothly
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggles dark mode on the body and changes the button text
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const toggleBtn = document.getElementById("darkModeToggle");
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "Light Mode";
  } else {
    toggleBtn.textContent = "Dark Mode";
  }
}

// --- Run code after the DOM is fully loaded ---
document.addEventListener("DOMContentLoaded", () => {

  // Get references to elements
  const topBtn = document.getElementById("topBtn");
  const reveals = document.querySelectorAll(".reveal");

  // --- Scroll-based Functionality ---
  const handleScroll = () => {
    // 1. Show/hide the "scroll to top" button
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }

    // 2. Reveal elements by adding the 'active' class
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  };

  // Attach the scroll handler and run it once on load
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // --- Intersection Observer for Fade-in Effect ---
  // Note: This is a separate animation from the 'reveal' animation above
  const faders = document.querySelectorAll('.class, .align, .lorem, .opacity');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transition = "opacity 1.2s ease-in";
        obs.unobserve(entry.target); // Unobserve after animation
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% of the element is visible
  });

  faders.forEach(el => {
    el.style.opacity = 0; // Make elements initially transparent
    observer.observe(el);
  });

  // --- "Join Now" Button Functionality ---
  const joinButtons = Array.from(document.querySelectorAll("button"))
    .filter(btn => btn.textContent.trim() === "Join Now");

  joinButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      // Prevent the link from being followed immediately if we wanted to
      // e.preventDefault(); 
      alert("Thanks for joining! We’ll redirect you to the video.");
    });
  });
});