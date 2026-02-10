document.addEventListener("scroll", () => {

  if (window.scrollY > 1400) {

    document
      .querySelectorAll(".reveal")
      .forEach(el => el.classList.add("visible"));

  }

});

