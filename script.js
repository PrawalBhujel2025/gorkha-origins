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

// Copy UPI ID functionality
const copyUpiBtn = document.getElementById("copyUpiBtn");
if (copyUpiBtn) {
  copyUpiBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("pawalbhujel321-1@okhdfcbank").then(() => {
      copyUpiBtn.textContent = "Copied! ✓";
      copyUpiBtn.style.background = "#c09a60";
      copyUpiBtn.style.color = "#1e3025";
      setTimeout(() => {
        copyUpiBtn.textContent = "Copy UPI";
        copyUpiBtn.style.background = "";
        copyUpiBtn.style.color = "";
      }, 2500);
    }).catch(() => {
      prompt("Copy UPI ID:", "pawalbhujel321-1@okhdfcbank");
    });
  });
}

// Product Collection Lightbox Modal
const productModal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

function openProductModal(imgSrc, tag, title, desc) {
  if (!productModal) return;
  if (modalImg) {
    modalImg.src = imgSrc;
    modalImg.alt = title || "Product preview";
  }
  if (modalTag) modalTag.textContent = tag || "GORKHA ORIGINS · AUTHENTIC PRODUCE";
  if (modalTitle) modalTitle.innerHTML = title || "";
  if (modalDesc) modalDesc.textContent = desc || "";
  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;

document.querySelectorAll(".collection-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.getAttribute("data-img");
    const tag = card.getAttribute("data-tag");
    const title = card.getAttribute("data-title");
    const desc = card.getAttribute("data-desc");
    openProductModal(img, tag, title, desc);
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && productModal && productModal.classList.contains("open")) {
    closeProductModal();
  }
});
