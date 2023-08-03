// Have scrolling show/hide the navbar
const navbar = document.querySelector('#navbar');
const hamburgerMenu = document.querySelector('#hamburgerMenu');
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
        // Going down
        navbar.classList.add('navbar--hidden');
        hamburgerMenu.classList.add('navbar--hidden');
    }
    else {
        // Going up
        navbar.classList.remove('navbar--hidden');
        hamburgerMenu.classList.remove('navbar--hidden');
    }

    lastScrollY = window.scrollY;
})

//Have the hamberger menu show and hide the navbar.
const hamburgerMenuBars = Array.from(document.querySelectorAll("#hamburgerMenu .bar"));
const navbarLinks = document.getElementById("navbarLinks");

const primaryColor = "#0e1524";
const secondaryColor = "#BBA147";
const white = "#FFF";

hamburgerMenu.addEventListener('click', () => {
    if(navbarLinks.classList.contains("active")) {
        navbarLinks.classList.remove("active");
        ChangeHamburgerMenuColor(white);

        navbar.style.height = "100px";
        navbar.style.background = "";
    }
    else {
        navbarLinks.classList.add("active");
        ChangeHamburgerMenuColor(secondaryColor);

        navbar.style.height = "100vh";
        navbar.style.background = "rgba(14, 21, 36)";
    }
});

//Have the hamburger menu change color on hover.
hamburgerMenu.addEventListener('mouseover', () => {
    if(!navbarLinks.classList.contains("active")) {
        ChangeHamburgerMenuColor(secondaryColor);
    }
});

hamburgerMenu.addEventListener('mouseleave', () => {
    if(!navbarLinks.classList.contains("active")) {
        ChangeHamburgerMenuColor(white);
    }
});

//Have clicking the navbar links close the navbar ddl.
navbarLinks.addEventListener('click', () => {
    if(window.innerWidth <= 800) {
        navbar.style.height = "";
        navbarLinks.classList.remove("active");
    }
});

//Reset the header height when the screen is too large.
window.onresize = function () {
    if(window.innerWidth > 800) {
        navbar.style.height = "";
        navbarLinks.classList.remove("active");
    }
}

function ChangeHamburgerMenuColor(hexColorString) {
    hamburgerMenuBars.forEach((bar, index) => {
        bar.style.backgroundColor = hexColorString;
    });
}