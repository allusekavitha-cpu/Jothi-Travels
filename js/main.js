/* =========================================================
   Jothi Travels & Tours — Simple site shared JS
   ========================================================= */

const PHONE_NUMBER = "9443486717";
const WHATSAPP_NUMBER = "919443486717";

/* ---------- Header scroll + mobile nav ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const isHome = document.body.classList.contains("page-home");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24 || !isHome) header.classList.add("solid");
    else header.classList.remove("solid");
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
  }
}

/* ---------- Hero slider (home page) ---------- */
function initHeroSlider() {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const dotsWrap = slider.querySelector(".hero-dots");
  let index = 0;
  let timer;

  function render() {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle("active", i === index));
    }
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(dot);
    });
  }

  const nextBtn = slider.querySelector(".hero-arrow.next");
  const prevBtn = slider.querySelector(".hero-arrow.prev");
  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restart(); });

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  render();
  restart();
}

/* ---------- Testimonial carousel ---------- */
function initTestimonials() {
  const track = document.querySelector(".testimonial-track");
  if (!track) return;
  const slides = Array.from(track.querySelectorAll(".testimonial-slide"));
  const dotsWrap = document.querySelector(".testimonial-dots");
  let index = 0;

  function render() {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    if (dotsWrap) Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle("active", i === index));
  }

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "Testimonial " + (i + 1));
      dot.addEventListener("click", () => { index = i; render(); });
      dotsWrap.appendChild(dot);
    });
  }

  render();
  setInterval(() => { index = (index + 1) % slides.length; render(); }, 5000);
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.15 });
  items.forEach((i) => obs.observe(i));
}

/* ---------- WhatsApp helpers ---------- */
function openWhatsApp(message, number) {
  const url = "https://wa.me/" + (number || WHATSAPP_NUMBER) + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

function buildBookingMessage(data) {
  return [
    "NEW CAB BOOKING",
    "",
    "Name: " + data.name,
    "Mobile: " + data.mobile,
    "Email: " + data.email,
    "",
    "Pickup: " + data.pickup,
    "Destination: " + data.destination,
    "",
    "Date: " + data.date,
    "Time: " + data.time,
    "",
    "Passengers: " + data.passengers,
    "Vehicle Type: " + data.vehicle,
    "Trip Type: " + data.tripType,
    "",
    "Booking Source: Website",
  ].join("\n");
}

function buildCallbackMessage(data) {
  return [
    "CALLBACK REQUEST",
    "",
    "Name: " + data.name,
    "Phone: " + data.phone,
    "",
    "Requirement: " + data.requirement,
  ].join("\n");
}

/* ---------- Booking form ---------- */
function initBookingForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;
  const successBox = document.getElementById("booking-success");
  const errorBox = document.getElementById("booking-error");

  // Pre-fill destination/vehicle from query string (?destination=...&vehicle=...)
  const params = new URLSearchParams(window.location.search);
  if (params.get("destination")) form.destination.value = params.get("destination");
  if (params.get("vehicle")) form.vehicle.value = params.get("vehicle");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.textContent = "";

    const data = {
      name: form.name.value.trim(),
      mobile: form.mobile.value.trim(),
      email: form.email.value.trim(),
      pickup: form.pickup.value.trim(),
      destination: form.destination.value.trim(),
      date: form.date.value,
      time: form.time.value,
      passengers: form.passengers.value,
      vehicle: form.vehicle.value,
      tripType: form.tripType.value,
    };

    if (!data.name || !data.mobile || !data.pickup || !data.destination || !data.date || !data.time || !data.vehicle || !data.tripType) {
      errorBox.textContent = "Please fill in all required fields.";
      return;
    }
    if (!/^\d{10}$/.test(data.mobile.replace(/\D/g, "").slice(-10))) {
      errorBox.textContent = "Please enter a valid 10-digit mobile number.";
      return;
    }

    openWhatsApp(buildBookingMessage(data));
    form.style.display = "none";
    successBox.style.display = "block";
  });
}

/* ---------- Callback form(s) ---------- */
function initCallbackForms() {
  document.querySelectorAll(".callback-form").forEach(function (form) {
    const successBox = form.parentElement.querySelector(".form-success");
    const errorBox = form.querySelector(".form-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorBox) errorBox.textContent = "";

      const data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        requirement: form.requirement.value.trim(),
      };

      if (!data.name || !data.phone || !data.requirement) {
        if (errorBox) errorBox.textContent = "Please fill in all fields.";
        return;
      }

      openWhatsApp(buildCallbackMessage(data));
      form.style.display = "none";
      if (successBox) successBox.style.display = "block";
    });
  });
}

/* ---------- Gallery filter + lightbox ---------- */
function initGallery() {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return;
  const buttons = document.querySelectorAll(".filter-bar button");
  const items = Array.from(grid.querySelectorAll("img"));
  const countEl = document.querySelector(".gallery-count");

  function applyFilter(cat) {
    let visible = 0;
    items.forEach((img) => {
      const match = cat === "All" || img.dataset.category === cat;
      img.style.display = match ? "block" : "none";
      if (match) visible++;
    });
    if (countEl) countEl.textContent = visible + " photos";
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });

  // Support ?category= query param (linked from other pages)
  const params = new URLSearchParams(window.location.search);
  const initialCat = params.get("category") || "All";
  const initialBtn = document.querySelector('.filter-bar button[data-filter="' + initialCat + '"]');
  if (initialBtn) {
    buttons.forEach((b) => b.classList.remove("active"));
    initialBtn.classList.add("active");
  }
  applyFilter(initialCat);

  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  items.forEach((img) => {
    img.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
    });
  });
  if (lightbox) {
    lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
  }
}

/* ---------- Destinations filter ---------- */
function initDestinationFilter() {
  const grid = document.querySelector(".destination-grid");
  if (!grid) return;
  const buttons = document.querySelectorAll(".filter-bar button");
  const cards = Array.from(grid.querySelectorAll(".dest-card"));

  function applyFilter(region) {
    cards.forEach((card) => {
      const match = region === "All" || card.dataset.region === region;
      card.style.display = match ? "" : "none";
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initHeader();
  initHeroSlider();
  initTestimonials();
  initReveal();
  initBookingForm();
  initCallbackForms();
  initGallery();
  initDestinationFilter();
});
