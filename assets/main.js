console.log("JS LOADED");
document.documentElement.classList.remove("no-js");

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('active');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('active');
  });
});

let observer = null;

function setupAnimations() {

  // Fade in immediately
  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("visible");
  });

  // Kill old observer
  if (observer) {
    observer.disconnect();
  }

  // Fallback
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => {
      el.classList.add("visible");
    });
    return;
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting &&
          !entry.target.classList.contains("visible")) {

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
  "Peter",
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const el = document.getElementById("typing");

function typeLoop() {

  const current = words[wordIndex];

  if (!deleting) {
    el.textContent = current.slice(0, charIndex++);
  } else {
    el.textContent = current.slice(0, charIndex--);
  }

  if (charIndex === current.length + 1) {
    deleting = true;
    setTimeout(() => {}, 800);
  }

  if (charIndex === 0 && deleting) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeLoop, deleting ? 50 : 90);
}

typeLoop();
