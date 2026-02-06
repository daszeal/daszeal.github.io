document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('active');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('active');
  });
});

const status = document.querySelector('.status-card p');
status.textContent = "IT'S FINALLY WORKINGGG";

fetch("https://daszeal.github.io/posts/feed.xml")

document.addEventListener("DOMContentLoaded", () => {
    initAnimations();
  setTimeout(initAnimations, 100);
  });

function initAnimations() {


  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  document.querySelectorAll(".fade-in, .reveal").forEach(el => {
    observer.observe(el);
  });

}

document.addEventListener("DOMContentLoaded", initAnimations);
window.addEventListener("pageshow", initAnimations);
});
