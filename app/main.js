const openedComponents = [];

const menu = {
    toggleButton: document.querySelector(".nav__menu-btn"),
    menuWrapper: document.querySelector(".mobile-menu__wrapper"),
    openedIndex: -1,
    open() {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelectorAll(".mobile-menu__wrapper a").forEach((el) => (el.tabIndex = 0));
        document.querySelectorAll("main a, main button").forEach((el) => (el.tabIndex = -1));
        document.querySelectorAll("header a, header button").forEach((el) => (el.tabIndex = -1));
        document.querySelectorAll("footer a, footer button").forEach((el) => (el.tabIndex = -1));

        this.toggleButton.tabIndex = 0;
        this.menuWrapper.classList.add("shown");
        this.toggleButton.classList.add("close");

        this.openedIndex = openedComponents.length;
        openedComponents.push(this);
    },
    close() {
        document.querySelector("body").style.overflow = "";
        document.querySelectorAll(".mobile-menu__wrapper a").forEach((el) => (el.tabIndex = -1));
        document.querySelectorAll("main a, main button").forEach((el) => (el.tabIndex = 0));
        document.querySelectorAll("header a, header button").forEach((el) => (el.tabIndex = 0));
        document.querySelectorAll("footer a, footer button").forEach((el) => (el.tabIndex = 0));

        setTimeout(() => {
            this.menuWrapper.scrollTop = 0;
        }, 300);

        this.menuWrapper.classList.remove("shown");
        this.toggleButton.classList.remove("close");

        this.openedIndex = -1;
        openedComponents.splice(this.openedIndex, 1);
    },
    init() {
        this.toggleButton.addEventListener("click", () => {
            if (this.openedIndex != -1) menu.close();
            else menu.open();
        });

        window.addEventListener("resize", (e) => {
            const mediaQuery = window.matchMedia("(min-width: 768px)");
            if (mediaQuery.matches && this.openedIndex != -1) menu.close();
        });
    },
};

const app = {
    init() {
        menu.init();

        window.addEventListener("keydown", (e) => {
            if (e.key == "Escape") {
                while (openedComponents.length > 0) {
                    openedComponents.pop().close();
                }
            }
        });
    },
};

app.init();
