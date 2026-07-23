// ========================================
// PORTFOLIO SCRIPT
// Kelvin Kioko Portfolio
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // ELEMENTS
    // ========================================

    const body = document.body;

    const header = document.querySelector("header");

    const menuButton = document.getElementById("menu-btn");

    const navLinks = document.querySelector(".nav-links");

    const themeButton = document.getElementById("theme-toggle");

    const themeIcon = themeButton.querySelector("i");



    // ========================================
    // MOBILE MENU
    // ========================================

    function openMenu() {

        navLinks.classList.add("active");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }


    function closeMenu() {

        navLinks.classList.remove("active");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }


    function toggleMenu() {

        if (navLinks.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    menuButton.addEventListener("click", toggleMenu);



    // ========================================
    // CLOSE MENU AFTER CLICKING A LINK
    // ========================================

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });



    // ========================================
    // DARK MODE
    // ========================================

    function setTheme(theme) {

        if (theme === "dark") {

            body.classList.add("dark");

            themeIcon.classList.remove("fa-moon");

            themeIcon.classList.add("fa-sun");

        }

        else {

            body.classList.remove("dark");

            themeIcon.classList.remove("fa-sun");

            themeIcon.classList.add("fa-moon");

        }

        localStorage.setItem("theme", theme);

    }



    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        setTheme("dark");

    }

    else {

        setTheme("light");

    }



    themeButton.addEventListener("click", () => {

        if (body.classList.contains("dark")) {

            setTheme("light");

        }

        else {

            setTheme("dark");

        }

    });



    // ========================================
    // STICKY HEADER
    // ========================================

    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("sticky");

        }

        else {

            header.classList.remove("sticky");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);



    // ========================================
    // DESKTOP RESET
    // ========================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMenu();

        }

    });

        // ========================================
    // ACTIVE NAVIGATION
    // ========================================

    const sections = document.querySelectorAll("section");

    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 140;

            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink);



    // ========================================
    // SCROLL ANIMATIONS
    // ========================================

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    document.querySelectorAll(

        ".section, .hero, .project-card, .service-card"

    ).forEach(element => {

        element.classList.add("hidden");

        observer.observe(element);

    });



    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================

    const topButton = document.createElement("button");

    topButton.id = "scrollTop";

    topButton.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(topButton);


    function toggleTopButton() {

        if (window.scrollY > 600) {

            topButton.classList.add("show");

        }

        else {

            topButton.classList.remove("show");

        }

    }

    toggleTopButton();

    window.addEventListener("scroll", toggleTopButton);


    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });



    // ========================================
    // CURRENT YEAR
    // ========================================

    const year = document.querySelector("#year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

});