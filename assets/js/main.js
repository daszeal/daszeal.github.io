document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll("a");

  links.forEach(link => {

    if (link.href && (link.href.startsWith("http://") || link.href.startsWith("https://"))) {
      const isExternal = new URL(link.href).hostname !== window.location.hostname;
      
      if (isExternal) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    }
  });
});