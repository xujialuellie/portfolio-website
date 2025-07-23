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
  const sections = document.querySelectorAll('.hero');
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;
    const viewportHeight = window.innerHeight;
    if (sectionTop < navbarHeight + 100 && sectionTop >= 0) {
      const opacity = 1 - (navbarHeight + 100 - sectionTop) / 100;
      section.style.opacity = Math.max(0, Math.min(1, opacity));
    } else if (sectionTop >= viewportHeight) {
      section.style.opacity = 0;
    } else if (sectionTop >= navbarHeight && sectionBottom <= viewportHeight) {
      section.style.opacity = 1;
    }
  });
});