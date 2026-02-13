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
