// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close the mobile menu after selecting a section
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Typing animation
const roles = [
  "B.Tech IT Student",
  "Aspiring Web Developer",
  "Java Programmer",
  "Python Programmer",
  "Technology Enthusiast"
];

const typingText = document.getElementById("typingText");
let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function runTypingAnimation() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    letterIndex--;
  } else {
    letterIndex++;
  }

  typingText.textContent = currentRole.substring(0, letterIndex);

  let delay = deleting ? 45 : 85;

  if (!deleting && letterIndex === currentRole.length) {
    deleting = true;
    delay = 1300;
  } else if (deleting && letterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  window.setTimeout(runTypingAnimation, delay);
}

runTypingAnimation();

// Current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Highlight the navigation item for the visible section
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => {
        const active = item.getAttribute("href") === `#${entry.target.id}`;
        item.classList.toggle("active", active);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

// Back-to-top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 450);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form: prepare an email in the visitor's default mail application.
// This static website does not send or store form submissions by itself.
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("senderName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  const subject = document.getElementById("senderSubject").value.trim();
  const message = document.getElementById("senderMessage").value.trim();

  if (!name || !email || !subject || !message) {
    formNote.textContent = "Please complete all fields before preparing your email.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formNote.textContent = "Please enter a valid email address.";
    return;
  }

  const mailSubject = encodeURIComponent(subject);
  const mailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  formNote.textContent = "Opening your email application...";
  window.location.href =
    `mailto:prathishkthiyagarajan@gmail.com?subject=${mailSubject}&body=${mailBody}`;
});
