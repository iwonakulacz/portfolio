const nav = document.querySelector(".nav");
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav__list");
const navbarLinks = document.querySelectorAll(".nav__list a");
const navLogo = document.querySelector(".nav__logo");
const arrow = document.querySelector(".arrowLink");
let isMenuActive = false;
const body = document.querySelector("body");
const slideItems = document.querySelectorAll(".slide-in");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
}

navLogo.addEventListener("click", navbarLinkClick);
arrow.addEventListener("click", e => smoothScroll(e));

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 200 && !nav.classList.contains("scroll")) {
    nav.classList.add("scroll");
  }
  if (scrollTop < 2) {
    nav.classList.remove("scroll");
  }
});

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  navList.classList.toggle("active");
  hamburger.classList.toggle("active");
  isMenuActive = !isMenuActive;
  hamburger.setAttribute("aria-expanded", isMenuActive);
  if (nav.classList.contains("active")) {
    body.classList.add("positionFixed");
  } else {
    body.classList.remove("positionFixed");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 991 && navList.classList.contains("active")) {
    navList.classList.remove("active");
    nav.classList.remove("active");
    body.classList.remove("positionFixed");
    hamburger.classList.remove("active");
  }
});

function navbarLinkClick(e) {
  if (navList.classList.contains("active")) {
    hamburger.click();
  }

  smoothScroll(e);
}

function smoothScroll(event) {
  event.preventDefault();
  const targetId =
    event.currentTarget.getAttribute("href") === "#"
      ? "header"
      : event.currentTarget.getAttribute("href");
  document.querySelector(targetId).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide() {
  slideItems.forEach(slideItem => {
    const slideInAt =
      window.scrollY + window.innerHeight - slideItem.clientHeight / 3;
    const imageBottom = slideItem.offsetTop + slideItem.clientHeight;
    const isHalfShown = slideInAt > slideItem.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      slideItem.classList.add("active");
    } else {
      slideItem.classList.remove("active");
    }
  });
}

if (window.innerWidth > 991) {
  window.addEventListener("scroll", debounce(checkSlide));
}
