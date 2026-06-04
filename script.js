const body = document.body;
const loader = document.querySelector(".loader");
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal, .animate-in");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const year = document.querySelector("[data-year]");
const smoothPage = document.querySelector("[data-smooth-page]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasHoverInput = window.matchMedia("(any-hover: hover), (pointer: fine)").matches;
const canRenderSmoothScroll =
  Boolean(smoothPage) && !prefersReducedMotion && hasHoverInput;

body.classList.add("is-loading");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    body.classList.remove("is-loading");
    revealItems.forEach((item, index) => {
      if (item.classList.contains("animate-in")) {
        window.setTimeout(() => item.classList.add("is-visible"), index * 60);
      }
    });
  }, 450);
});

if (year) {
  year.textContent = new Date().getFullYear();
}

navToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId && targetId !== "#" ? document.querySelector(targetId) : null;

    closeNavigation();

    if (!canRenderSmoothScroll || !target) {
      return;
    }

    event.preventDefault();
    scrollToAnchor(target, targetId);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -70px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

function closeNavigation() {
  body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function updateScrollEffects(scrollY = window.scrollY) {
  header.classList.toggle("is-scrolled", scrollY > 16);

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax);
    const offset = scrollY * speed;
    item.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
}

let ticking = false;

if (!canRenderSmoothScroll) {
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

if (canRenderSmoothScroll) {
  initSmoothPageRenderer();
}

updateScrollEffects();

function initSmoothPageRenderer() {
  let currentScroll = window.scrollY;
  let pageHeight = 0;
  const ease = 0.38;

  body.classList.add("smooth-scroll");
  updatePageHeight();

  window.addEventListener("resize", updatePageHeight);
  window.addEventListener("load", updatePageHeight);
  requestAnimationFrame(renderSmoothPage);

  function updatePageHeight() {
    pageHeight = smoothPage.getBoundingClientRect().height;
    body.style.height = `${pageHeight}px`;
  }

  function renderSmoothPage() {
    const targetScroll = window.scrollY;
    const distance = targetScroll - currentScroll;

    currentScroll += distance * ease;

    if (Math.abs(distance) < 0.1) {
      currentScroll = targetScroll;
    }

    smoothPage.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
    updateScrollEffects(currentScroll);
    requestAnimationFrame(renderSmoothPage);
  }
}

function scrollToAnchor(target, targetId) {
  const top = Math.max(target.offsetTop - header.offsetHeight - 24, 0);

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  if (targetId) {
    history.pushState(null, "", targetId);
  }
}
