
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

//-------menu 
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

var sidemenu = document.getElementById("side_menu");
function open_menu() {
    sidemenu.style.right = "0";
    document.getElementById("menu-icon").style.display = "none";

}
function close_menu() {
    sidemenu.style.right = "-200px";
    document.getElementById("menu-icon").style.display = "block";

}
document.querySelectorAll("#side_menu a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 860) {
            close_menu();
        }
    });
});

document.addEventListener("click", function (event) {
    const menu = document.getElementById("side_menu");
    const menuButton = document.querySelector(".fa-bars");

    if (window.innerWidth <= 860 && !menu.contains(event.target) && !menuButton.contains(event.target)) {
        close_menu();
    }
});

//----------------------scroll behavieour------------------ 
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    shadowAndHideNav();
});

function shadowAndHideNav() {
    const navBar = document.getElementById('navBar');
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 50) {
        navBar.style.boxShadow = "0px 2px 6px rgba(9, 244, 244, 1)";
        navBar.style.transition = "top 0.3s ease";

        if (currentScroll > lastScrollTop) {
            if (window.innerWidth <= 680) {
                navBar.style.top="-37px";
                
            }
            else {
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
    }
     else {
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




//---------------------forms content to google forms=-----------//
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
