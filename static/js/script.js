const projectElement = document.getElementsByClassName("clickable-content");

const projectFrame = document.getElementsByClassName("color-changing-items");

for (let i = 0; i < projectElement.length; i++) {
  projectElement[i].addEventListener("click", function () {
    projectFrame[i].style.backgroundColor = "#DE9DC2";
  });
}

// Smooth scroll with offset for navbar
document.querySelectorAll('.navbar-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = button.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

document.addEventListener('scroll', () => {
  const home = document.querySelector('.home');
  if (!home) return; // Exit if no .home section exists
  const rect = home.getBoundingClientRect();
  const sectionTop = rect.top;
  const viewportHeight = window.innerHeight;

  if (sectionTop <= viewportHeight && sectionTop >= -rect.height) {
    const opacity = 1 - Math.abs(sectionTop) / (viewportHeight / 2);
    home.style.opacity = Math.max(0, Math.min(1, opacity));
  } else {
    home.style.opacity = 0;
  }
});

document.getElementById('emailForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form submission for demo

  const emailInput = document.querySelector('input[name="email"]').value;
  const popupBox = document.getElementById('popupBox');
  const popupTitle = document.getElementById('popupTitle');
  const popupMessage = document.getElementById('popupMessage');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to show popup
  function showPopup(title, message, type) {
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popupBox.classList.add('show', type);
    
    // Automatically hide after 3 seconds
    setTimeout(() => {
      popupBox.classList.remove('show', type);
    }, 3000);
  }
// Client-side email validation
  if (!emailRegex.test(emailInput)) {
    showPopup('Invalid Email', 'Please enter a valid email address.', 'error');
    return;
  }

  // Send request to Flask backend
  try {
    const response = await fetch('/submit-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        'email': emailInput
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'success') {
      showPopup('Success', data.message, 'success');
    } else if (data.status === 'warning') {
      showPopup('Email Exists', data.message, 'warning');
    } else {
      showPopup('Error', data.message, 'error');
    }
  } catch (error) {
    showPopup('Error', `Failed to submit email: ${error.message}`, 'error');
  }
});

// Close popup when clicking the close button
document.getElementById('closePopup').addEventListener('click', function() {
  document.getElementById('popupBox').classList.remove('show', 'success', 'error', 'warning');
});