//-------------------languages

window.addEventListener("DOMContentLoaded", () => {
    const storedLang = localStorage.getItem("lang");
    const browserLang = navigator.language.slice(0, 2);
    const lang = storedLang || (["en", "fr", "ar"].includes(browserLang) ? browserLang : "en");
    setLang(lang);
});

function toggleLangMenu() {
    document.getElementById("lang-menu").classList.toggle("lang-hidden");
}

document.addEventListener("click", function (event) {
    const langMenu = document.getElementById("lang-menu");
    const menuButton = document.querySelector(".lang-btn");

    if (!langMenu.contains(event.target) && !menuButton.contains(event.target)) {
        langMenu.classList.add("lang-hidden");
    }
});


function setLang(lang) {
    console.log("Selected language:", lang);
    localStorage.setItem("lang", lang);
    document.querySelector(".lang-btn span").innerText = lang.toUpperCase();
    document.getElementById("lang-menu").classList.add("lang-hidden");

    fetch(`./locales/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            const elements = document.querySelectorAll("[data-i18n]");
            elements.forEach(el => {
                const key = el.getAttribute("data-i18n");
                const value = translations[key];

                if (value) {
                    el.innerHTML = value;
                } else {
                    el.innerHTML = `[${key}]`;
                }
            });
        })
        .catch(error => console.error("Error loading translation:", error));
}


//--------------------------theme-----------------------------------//

let darkmode = localStorage.getItem('darkmode');
const themeToggle = document.getElementById('theme-toggle');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

themeToggle.addEventListener("click", function () {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode === "active") {
        disableDarkmode();
    } else {
        enableDarkmode();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    let darkmode = localStorage.getItem('darkmode');

    if (darkmode === "active") {
        enableDarkmode();
    } else if (darkmode === null) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            enableDarkmode();
        } else {
            disableDarkmode();
        }
    }
});


//---------skill-drop-------
document.querySelectorAll('.skill-section').forEach(section => {
    section.addEventListener('click', () => {
        const chevron = section.querySelector('.fa-chevron-down');
        const row = section.querySelector('.skill-row');

        row.classList.toggle('hidden');
        chevron.classList.toggle('rotate');
    });
});

//-------tabs (about section)
var tablinks = document.getElementsByClassName("tab-links");
var tabcontent = document.getElementsByClassName("tab-content");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabconten of tabcontent) {
        tabconten.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

//-------side menu (mobile / tablet)
// State is driven by a single "menu-open" class on #side_menu instead of
// inline styles, so it always matches whatever width/position is defined
// in CSS for the current breakpoint (fixes the menu never fully closing).
var sidemenu = document.getElementById("side_menu");
var menuIcon = document.getElementById("menu-icon");

function open_menu() {
    sidemenu.classList.add("menu-open");
    menuIcon.classList.add("icon-hidden");
}

function close_menu() {
    sidemenu.classList.remove("menu-open");
    menuIcon.classList.remove("icon-hidden");
}

function isMenuOpen() {
    return sidemenu.classList.contains("menu-open");
}

document.querySelectorAll("#side_menu a").forEach(link => {
    link.addEventListener("click", () => {
        if (isMenuOpen()) {
            close_menu();
        }
    });
});

// Close the side menu on outside click/tap — but only while it is
// actually open, and never for clicks on the hamburger icon itself
// (that toggle already runs its own onclick handler).
document.addEventListener("click", function (event) {
    if (!isMenuOpen()) return;

    const clickedInsideMenu = sidemenu.contains(event.target);
    const clickedHamburger = menuIcon.contains(event.target);

    if (!clickedInsideMenu && !clickedHamburger) {
        close_menu();
    }
});

// Close the menu automatically if the viewport grows back into desktop size
window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && isMenuOpen()) {
        close_menu();
    }
});

//----------------------scroll behaviour------------------
// Hides/shows the fixed nav on scroll. On mobile, focusing an input
// opens the on-screen keyboard, which the browser handles by
// auto-scrolling the page a few pixels. That tiny automatic scroll
// used to trigger the "hide/slide" nav animation, which looked like
// the menu popping open. We only ignore scroll events for a brief
// window right after a field is focused — normal scrolling while
// typing still works exactly as before.
let lastScrollTop = 0;
const SCROLL_THRESHOLD = 8;
let ignoreScrollUntil = 0;

document.addEventListener("focusin", (event) => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        ignoreScrollUntil = Date.now() + 400;
    }
});

window.addEventListener("scroll", function () {
    if (Date.now() < ignoreScrollUntil || isMenuOpen()) {
        return;
    }

    shadowAndHideNav();
});

function shadowAndHideNav() {
    const navBar = document.getElementById('navBar');
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(currentScroll - lastScrollTop) < SCROLL_THRESHOLD) {
        return;
    }

    if (currentScroll > 50) {
        navBar.style.boxShadow = "0px 2px 6px rgba(9, 244, 244, 1)";
        navBar.style.transition = "top 0.3s ease";

        if (currentScroll > lastScrollTop) {
            if (window.innerWidth <= 680) {
                navBar.style.top = "-37px";
            } else {
                navBar.style.top = "-62px";
            }
        } else {
            navBar.style.top = "5px";
        }

        if (window.innerWidth <= 850) {
            navBar.style.height = "35px";
        } else {
            navBar.style.height = "60px";
        }
    } else {
        navBar.style.boxShadow = "none";
        navBar.style.top = "6px";
        if (window.innerWidth <= 850) {
            navBar.style.height = "40px";
        } else {
            navBar.style.height = "80px";
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}


//---------------------forms content to google forms-----------//
const scriptURL = 'https://script.google.com/macros/s/AKfycbwaSF6JQkOsTXcyi_jX_ceiZDWqAV5XzLQ-ezOyP31bWA3YblPm2wnjvbhxOvyJbKWy/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully !"
            setTimeout(function () {
                msg.innerHTML = ""
            }, 5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))

})