console.log("JS LOADED");
document.documentElement.classList.remove("no-js");

let observer = null;

function setupAnimations() {

  // Fade in on load
  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("visible");
  });

  if (observer) observer.disconnect();

  // Fallback
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => {
      el.classList.add("visible");
    });
    return;
  }

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25
  });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
}

// Normal load
window.addEventListener("load", setupAnimations);

// Cache restore
window.addEventListener("pageshow", setupAnimations);

document.addEventListener("DOMContentLoaded", () => {

  const siteHost = window.location.hostname;

  document.querySelectorAll("a[href]").forEach(link => {

    const url = new URL(link.href, window.location.origin);

    // If link goes to another site
    if (url.hostname !== siteHost) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }

  });

});
const words = [
  "Daszeal",
  "Peter Jiang",
  "蒋睿倾",
  "daszeal",
  "Peter"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 80;     // typing speed
const deleteSpeed = 50;  // deleting speed
const holdTime = 2000;   // pause after finish

const el = document.getElementById("typing");

function typeLoop() {
  const word = words[wordIndex];

  if (!isDeleting) {
    el.textContent = word.slice(0, charIndex++);
  } else {
    el.textContent = word.slice(0, charIndex--);
  }

  let delay = isDeleting ? deleteSpeed : typeSpeed;

  if (!isDeleting && charIndex === word.length + 1) {
    delay = holdTime;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();
