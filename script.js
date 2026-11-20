const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});
document.getElementById("year").textContent = new Date().getFullYear();

// Hero Background Slideshow
const heroSlides = document.querySelectorAll(".hero-slide");
const slideDots = document.querySelectorAll(".slide-dot");
const prevSlideBtn = document.querySelector(".prev-slide");
const nextSlideBtn = document.querySelector(".next-slide");
const slideCaption = document.getElementById("hero-slide-caption");

if (heroSlides.length > 0) {
  let currentSlide = 0;
  let slideTimer;

  function showSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    slideDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    if (slideCaption && heroSlides[index]) {
      const label = heroSlides[index].getAttribute("data-label");
      if (label) slideCaption.textContent = label;
    }
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % heroSlides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }

  function startAutoplay() {
    stopAutoplay();
    slideTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (slideTimer) clearInterval(slideTimer);
  }

  slideDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      showSlide(idx);
      startAutoplay();
    });
  });

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", stopAutoplay);
    heroSection.addEventListener("mouseleave", startAutoplay);
  }

  startAutoplay();
}
