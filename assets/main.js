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

const status = document.querySelector('.status-card p');

function initAnimations() {

  // Fade in on load
  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("visible");
  });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
}

// Run when page loads
window.addEventListener("load", initAnimations);

// Run when coming back via cache
window.addEventListener("pageshow", initAnimations);



