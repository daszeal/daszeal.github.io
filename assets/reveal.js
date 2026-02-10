document.addEventListener("scroll", () => {

  const triggerPoint = window.innerHeight * 0.8;
  const cardsSection = document.querySelector(".home-cards");

  if (!cardsSection) return;

  const top = cardsSection.getBoundingClientRect().top;

  if (top < triggerPoint) {

    document
      .querySelectorAll(".reveal")
      .forEach(el => el.classList.add("visible"));

  }

});
