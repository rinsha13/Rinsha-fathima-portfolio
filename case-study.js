(() => {
  const menuButton = document.querySelector("#menuBtn");
  const navLinks = document.querySelector("#navLinks");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("nav-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "×" : "☰";
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }

  // Copy the exact palette HEX value from each swatch.
  const toast = document.querySelector("#toast");
  let toastTimer;
  document.querySelectorAll(".copy-color").forEach(button => {
    button.addEventListener("click", async () => {
      const color = button.dataset.color;
      try {
        await navigator.clipboard.writeText(color);
        toast.textContent = `${color.toUpperCase()} copied`;
      } catch {
        toast.textContent = `HEX value: ${color.toUpperCase()}`;
      }
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
    });
  });

  // Gentle tilt for the abstract hero object on pointer devices.
  const art = document.querySelector(".hero-art");
  const glass = document.querySelector(".glass-shape");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (art && glass && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    art.addEventListener("pointermove", event => {
      const rect = art.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      glass.style.marginTop = `${-y * 5}px`;
      glass.style.marginLeft = `${x * 5}px`;
    });
    art.addEventListener("pointerleave", () => {
      glass.style.marginTop = "0";
      glass.style.marginLeft = "0";
    });
  }
})();