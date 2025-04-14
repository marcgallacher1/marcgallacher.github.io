// Init scroll animations
AOS.init();

let currentCard = 0;

function showCard(index) {
  const cards = document.querySelectorAll('.project-card-container');
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

function nextCard() {
  const cards = document.querySelectorAll('.project-card-container');
  currentCard = (currentCard + 1) % cards.length;
  showCard(currentCard);
}

function prevCard() {
  const cards = document.querySelectorAll('.project-card-container');
  currentCard = (currentCard - 1 + cards.length) % cards.length;
  showCard(currentCard);
}

function toggleMode() {
  const body = document.body;
  const icon = document.getElementById('modeIcon');

  // Toggle the light-mode class; if present, we're in light mode
  const isLight = body.classList.toggle('light-mode');

  if (isLight) {
    // Light mode: set icon to sun and store theme as light
    icon.classList.remove('bi-moon-fill');
    icon.classList.add('bi-sun-fill');
    localStorage.setItem('theme', 'light');
  } else {
    // Dark mode: remove light-mode, set icon to moon and store theme as dark
    icon.classList.remove('bi-sun-fill');
    icon.classList.add('bi-moon-fill');
    localStorage.setItem('theme', 'dark');
  }
}

// On page load, check the stored preference and set the theme accordingly
window.onload = () => {
  const storedTheme = localStorage.getItem('theme');
  const icon = document.getElementById('modeIcon');

  if (storedTheme === 'light') {
    document.body.classList.add('light-mode');
    icon.classList.remove('bi-moon-fill');
    icon.classList.add('bi-sun-fill');
  } else {
    // Default to dark mode
    document.body.classList.remove('light-mode');
    icon.classList.remove('bi-sun-fill');
    icon.classList.add('bi-moon-fill');
  }
};

// Contact form submission handling with fade out for success message
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent the default form submission
    
    const formData = new FormData(contactForm);
    
    try {
      // Send form data to FormSubmit via fetch
      const response = await fetch("https://formsubmit.co/marc.gallacher10@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        // Show success message, then fade it out after 3 seconds
        const formStatus = document.getElementById("formStatus");
        formStatus.style.display = "block";
        formStatus.style.opacity = 1; // Ensure message is fully visible
        
        setTimeout(() => {
          formStatus.style.transition = "opacity 1s ease-out";
          formStatus.style.opacity = 0;
          // After the fade-out transition, hide the element completely
          setTimeout(() => {
            formStatus.style.display = "none";
          }, 1000);
        }, 3000);
        
        contactForm.reset();
      } else {
        alert("There was an error sending the message. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error sending the message. Please try again later.");
    }
  });
};




