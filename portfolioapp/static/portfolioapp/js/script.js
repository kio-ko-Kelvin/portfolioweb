// =========================================================
// PORTFOLIO SCRIPT
// Kelvin Kioko Portfolio
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =====================================================
    // ELEMENTS
    // =====================================================

    const body = document.body;
    const header = document.querySelector("header");

    const menuButton = document.getElementById("menu-btn");
    const navLinks = document.querySelector(".nav-links");

    const themeButton = document.getElementById("theme-toggle");
    const themeIcon = themeButton?.querySelector("i");

    // =====================================================
    // MOBILE MENU
    // =====================================================

    function setMenuState(isOpen) {
        if (!menuButton || !navLinks) {
            return;
        }

        navLinks.classList.toggle("active", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        const icon = menuButton.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }
    }

    function toggleMenu() {
        if (!navLinks) {
            return;
        }

        const isOpen = navLinks.classList.contains("active");

        setMenuState(!isOpen);
    }

    menuButton?.addEventListener("click", toggleMenu);

    // Close menu after clicking a navigation link.
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    // Close mobile navigation when returning to desktop.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            setMenuState(false);
        }
    });

    // =====================================================
    // DARK MODE
    // =====================================================

    function setTheme(theme) {
        const isDark = theme === "dark";

        body.classList.toggle("dark", isDark);

        if (themeIcon) {
            themeIcon.classList.toggle("fa-moon", !isDark);
            themeIcon.classList.toggle("fa-sun", isDark);
        }

        if (themeButton) {
            themeButton.setAttribute(
                "aria-pressed",
                String(isDark)
            );

            themeButton.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );
        }

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );
    }

    function getInitialTheme() {
        const savedTheme = localStorage.getItem("theme");

        // User's previous choice takes priority.
        if (
            savedTheme === "dark" ||
            savedTheme === "light"
        ) {
            return savedTheme;
        }

        // Otherwise follow the operating system preference.
        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light";
    }

    setTheme(getInitialTheme());

    themeButton?.addEventListener("click", () => {
        const newTheme = body.classList.contains("dark")
            ? "light"
            : "dark";

        setTheme(newTheme);
    });

    // =====================================================
    // ACTIVE NAVIGATION
    // =====================================================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".nav-links a"
    );

    function updateActiveLink() {
        if (
            !sections.length ||
            !navigationLinks.length
        ) {
            return;
        }

        const scrollPosition =
            window.scrollY + 160;

        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        // Make the final section active at the bottom.
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {
            currentSection =
                sections[sections.length - 1].id;
        }

        navigationLinks.forEach((link) => {
            const isActive =
                link.getAttribute("href") ===
                `#${currentSection}`;

            link.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {
                link.setAttribute(
                    "aria-current",
                    "page"
                );
            } else {
                link.removeAttribute(
                    "aria-current"
                );
            }
        });
    }

    // =====================================================
    // STICKY HEADER
    // =====================================================

    function updateHeader() {
        if (!header) {
            return;
        }

        header.classList.toggle(
            "sticky",
            window.scrollY > 50
        );
    }

    // =====================================================
    // SCROLL TO TOP
    // =====================================================

    function createScrollTopButton() {
        const button =
            document.createElement("button");

        button.type = "button";
        button.id = "scrollTop";

        button.setAttribute(
            "aria-label",
            "Scroll to top"
        );

        button.innerHTML =
            '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';

        document.body.appendChild(button);

        button.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });

        return button;
    }

    const topButton =
        createScrollTopButton();

    function updateScrollTopButton() {
        topButton.classList.toggle(
            "show",
            window.scrollY > 600
        );
    }

    // =====================================================
    // COMBINED SCROLL HANDLER
    // =====================================================

    function handleScroll() {
        updateHeader();
        updateActiveLink();
        updateScrollTopButton();
    }

    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true,
        }
    );

    // Run once immediately.
    handleScroll();

    // =====================================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================================

    const revealElements =
        document.querySelectorAll(
            ".section, .hero, .project-card, .service-card"
        );

    if (
        "IntersectionObserver" in window
    ) {
        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {
                    entries.forEach(
                        (entry) => {
                            if (
                                entry.isIntersecting
                            ) {
                                entry.target.classList.add(
                                    "show"
                                );

                                observerInstance.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.15,
                }
            );

        revealElements.forEach(
            (element) => {
                element.classList.add(
                    "hidden"
                );

                observer.observe(element);
            }
        );
    } else {
        // Fallback for older browsers.
        revealElements.forEach(
            (element) => {
                element.classList.add(
                    "show"
                );
            }
        );
    }

    // =====================================================
    // CURRENT YEAR
    // =====================================================

    const yearElement =
        document.getElementById("year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }
});