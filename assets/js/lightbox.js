// assets/js/lightbox.js
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(() => {
    // Change this selector if your images use a different wrapper on some pages
    const thumbs = Array.from(document.querySelectorAll(".image.fit img"));
    if (!thumbs.length) return;

    // Build modal once
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    // IMPORTANT:
    // - Keep the X as HTML (&times;)
    // - Make arrow buttons EMPTY so you don't get double arrows
    //   (arrows will be drawn via CSS ::before)
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Close (Esc)">&times;</button>
      <button class="lightbox__nav lightbox__prev" aria-label="Previous (Left Arrow)"></button>
      <figure class="lightbox__figure">
        <img class="lightbox__img" alt="" />
      </figure>
      <button class="lightbox__nav lightbox__next" aria-label="Next (Right Arrow)"></button>
    `;
    document.body.appendChild(lightbox);

    // Make thumbs clickable
    thumbs.forEach((img) => {
      img.classList.add("lightbox-thumb");
      img.style.cursor = "pointer";
    });

    const lbImg = lightbox.querySelector(".lightbox__img");
    const btnClose = lightbox.querySelector(".lightbox__close");
    const btnPrev = lightbox.querySelector(".lightbox__prev");
    const btnNext = lightbox.querySelector(".lightbox__next");

    let currentIndex = 0;
    let lastFocusedEl = null;

    function show(index) {
      currentIndex = (index + thumbs.length) % thumbs.length;
      const src = thumbs[currentIndex].getAttribute("src");
      const alt = thumbs[currentIndex].getAttribute("alt") || "";
      lbImg.src = src;
      lbImg.alt = alt;
    }

    function openLightbox(index) {
      currentIndex = index;
      lastFocusedEl = document.activeElement;

      show(currentIndex);

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      btnClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");

      if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
        lastFocusedEl.focus();
      }
    }

    function next() {
      show(currentIndex + 1);
    }
    function prev() {
      show(currentIndex - 1);
    }

    // Click thumbnail -> open
    thumbs.forEach((img, i) => img.addEventListener("click", () => openLightbox(i)));

    // Buttons
    btnClose.addEventListener("click", closeLightbox);
    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);

    // Click backdrop -> close (only when clicking outside the image/buttons)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox__figure")) {
        closeLightbox();
      }
    });

    // Keyboard
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });
  });
})();