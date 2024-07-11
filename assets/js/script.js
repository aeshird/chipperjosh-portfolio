// script.js
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".zoomable-image");
  
    images.forEach(image => {
      image.addEventListener("click", () => {
        openFullscreen(image);
      });
    });
  
    function openFullscreen(image) {
      const fullscreenDiv = document.createElement("div");
      fullscreenDiv.classList.add("fullscreen");
  
      const fullscreenImage = image.cloneNode();
      fullscreenDiv.appendChild(fullscreenImage);
  
      fullscreenDiv.addEventListener("click", () => {
        document.body.removeChild(fullscreenDiv);
      });
  
      document.body.appendChild(fullscreenDiv);
    }
  });   