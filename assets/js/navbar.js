//Have the hamberger menu show and hide the navbar.
const navbar = document.getElementById("navbar");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const hamburgerMenuBars = Array.from(document.querySelectorAll("#hamburgerMenu .bar"));
const navbarLinks = document.getElementById("navbarLinks");

const primaryColor = "#3668d3";
const secondaryColor = "#BBA147";
const white = "#FFF";

hamburgerMenu.addEventListener('click', () => {
    if(navbarLinks.classList.contains("active")) {
        navbarLinks.classList.remove("active");
        ChangeHamburgerMenuColor(white);

        navbar.style.height = "0vh";
    }
    else {
        navbarLinks.classList.add("active");
        ChangeHamburgerMenuColor(primaryColor);

        navbar.style.height = "100vh";
    }
});

//Have the hamburger menu change color on hover.
hamburgerMenu.addEventListener('mouseover', () => {
    if(!navbarLinks.classList.contains("active")) {
        ChangeHamburgerMenuColor(primaryColor);
    }
});

hamburgerMenu.addEventListener('mouseleave', () => {
    if(!navbarLinks.classList.contains("active")) {
        ChangeHamburgerMenuColor(white);
    }
});

//Get the page the user is going to.
// const url = window.location.href.split('#');
// let page = "home";
// if (url.length > 1) {
//     page = url[1];
// }
// ChangePage(page);

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


// function ChangePage(page) {
//     //Highlight the navbar element for the current page.
//     let nbOptions = Array.from(document.querySelectorAll("#navbarLinks > a"));
//     nbOptions.forEach((nbOption, index) => {
//         if(nbOption.id == `nb${page}`) {
//             nbOption.style.color = primary-color;
//         }
//         else {
//             nbOption.style.color = white;
//         }
//     });

//     //Show the content of the current page.
//     let sections = Array.from(document.getElementsByTagName("section"));
//     sections.forEach((section, index) => {
//         if(section.id == page) {
//             section.classList.add("show");
//         }
//         else {
//             section.classList.remove("show");
//         }
//     });

//     //Hide the navbar drop down for smaller screens upon selection.
//     navbarLinks.classList.remove("active");
//     ChangeHamburgerMenuColor(white);
// }

function ChangeHamburgerMenuColor(hexColorString) {
    hamburgerMenuBars.forEach((bar, index) => {
        bar.style.backgroundColor = hexColorString;
    });
}