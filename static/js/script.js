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

async function showPopup(event) {
  event.preventDefault();
  const email = document.getElementById('email-input').value;
    
  try {
    // Send form data instead of JSON
    const formData = new FormData();
    formData.append('email', email);

    const response = await fetch('/submit-email', {
      method: 'POST',
      body: formData
    });
      
    const data = await response.json();
    
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
      
    // Set title based on status
    popupTitle.textContent = {
      success: 'Success',
      error: 'Error',
      warning: 'Warning'
    }[data.status] || 'Notification';

    popupMessage.textContent = data.message;
    popup.className = `popup ${data.status}`; // Set class based on status

    popup.style.display = 'block';
    overlay.style.display = 'block';

      // Automatically close popup after 5 seconds
      // setTimeout(() => {closePopup();}, 5000);
      
  } catch (error) {
      console.error('Error fetching popup content:', error);
  }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}