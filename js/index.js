const nav = document.querySelector(".nav");
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav__list");
const navbarLinks = document.querySelectorAll(".nav__list a");
const navLogo = document.querySelector(".nav__logo");
const arrow = document.querySelector('.arrowLink');
let isMenuActive = false;

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
}

navLogo.addEventListener("click", navbarLinkClick);
arrow.addEventListener('click', (e) => smoothScroll(e));

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
  isMenuActive = !isMenuActive;
  hamburger.setAttribute("aria-expanded", isMenuActive);
});

window.addEventListener("resize", () => {
    if(window.width > 991 && navList.classList.contains("active")){
        navList.classList.remove("active");
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
