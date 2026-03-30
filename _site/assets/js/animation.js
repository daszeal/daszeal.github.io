document.documentElement.classList.remove("no-js");

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
  document.querySelectorAll(".card.reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 70);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const siteHost = location.hostname;
  document.querySelectorAll("a[href]").forEach(link => {
    const url = new URL(link.href, location.origin);
    if (url.hostname !== siteHost) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  // Typing animation for h1 on homepage
  const h1 = document.querySelector(".home-content h1");
  if (h1) {
    const originalText = h1.textContent;
    h1.textContent = "";
    h1.classList.add("typing-heading");
    
    // Animate the heading with typing effect
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < originalText.length) {
        h1.textContent += originalText[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // After 3 seconds (when typing animation finishes), add done class
        // This removes the border and stops blinking
        setTimeout(() => {
          h1.classList.add("done");
        }, 500);
      }
    }, 75); // ~75ms per character for slower typing
  }

  // Typing animation for paragraphs (fast, row by row)
  const paragraphs = document.querySelectorAll(".home-content p");
  if (paragraphs.length > 0) {
    paragraphs.forEach((p, index) => {
      p.classList.add("typing-paragraph");
      // Stagger the paragraph animations: start at 3.5s, then 50ms apart
      setTimeout(() => {
        p.classList.add("animate");
      }, 1000 + (index * 50));
    });
  }
});
