// Scroll reveal + gentle pointer-driven 3D tilt.
// The page remains visible if IntersectionObserver is not supported.
(() => {
  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-content, .skills-grid, .skill-card, .project-card, .experience-card, .contact-inner"
  );

  if ("IntersectionObserver" in window) {
    revealTargets.forEach((element) => element.classList.add("reveal-ready"));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  const scene = document.querySelector(".scene");
  const crystal = document.querySelector("#avatarTilt");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (scene && crystal && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    scene.addEventListener("pointermove", (event) => {
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      crystal.style.transform = `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 13).toFixed(2)}deg)`;
    });
    scene.addEventListener("pointerleave", () => {
      crystal.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  // Mobile navigation toggle + close after choosing a section.
  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (menuButton && navLinks) {
    menuButton.setAttribute("aria-label", "Toggle navigation menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("nav-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "×" : "☰";
    });
    navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }
})();
