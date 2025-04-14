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
  
  // Toggle between dark-mode and light-mode
  const isDark = body.classList.toggle('light-mode');
  
  // Change the icon to reflect the current mode
  icon.classList.remove(isDark ? 'bi-moon-fill' : 'bi-sun-fill');
  icon.classList.add(isDark ? 'bi-sun-fill' : 'bi-moon-fill');

  // Save the theme preference in localStorage
  if (isDark) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

// On page load, check if dark mode was previously saved in localStorage
window.onload = () => {
  // If dark mode was saved previously in localStorage, apply it
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('modeIcon').classList.remove('bi-moon-fill');
    document.getElementById('modeIcon').classList.add('bi-sun-fill');
  } else {
    // If no preference is stored, default to dark mode
    document.body.classList.add('dark-mode');
    document.getElementById('modeIcon').classList.remove('bi-moon-fill');
    document.getElementById('modeIcon').classList.add('bi-sun-fill');
  }
}

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




