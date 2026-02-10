document.addEventListener("scroll", () => {

  if (window.scrollY > 50000) {

    document
      .querySelectorAll(".reveal")
      .forEach(el => el.classList.add("visible"));

  }

});

