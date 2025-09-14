const openedComponents = [];

const mobileMenuButton = document.querySelector(".nav__menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

const isMobileMenuOpened = () => mobileMenuButton.getAttribute("aria-expanded") === "true";

const mobileLinks = Array.from(mobileMenu.querySelectorAll("a"));

mobileLinks.at(-1).addEventListener("keydown", (e) => {
    if (!e.shiftKey && e.key === "Tab") {
        e.preventDefault();
        mobileMenuButton.focus();
    }
});

mobileMenuButton.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key === "Tab") {
        e.preventDefault();
        mobileLinks.at(-1).focus();
    }
});

const openMobileMenu = () => {
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo({ top: 0 });
    mobileMenu.classList.add("shown");

    mobileMenuButton.setAttribute("aria-expanded", "true");
};

const closeMobileMenu = () => {
    document.querySelector("body").style.overflow = null;

    mobileMenu.classList.remove("shown");

    mobileMenuButton.setAttribute("aria-expanded", "false");
};

mobileMenuButton.addEventListener("click", () => {
    if (!isMobileMenuOpened()) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobileMenuOpened()) {
        closeMobileMenu();
    }
});

window.addEventListener("resize", () => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.matches && isMobileMenuOpened()) closeMobileMenu();
});
