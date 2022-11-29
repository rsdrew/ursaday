//Have the hamberger menu show and hide the navbar.
const header = document.getElementById("header");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const hamburgerMenuBars = Array.from(document.querySelectorAll("#hamburgerMenu .bar"));
const navbarLinks = document.getElementById("navbarLinks");

hamburgerMenu.addEventListener('click', () => {
    if(navbarLinks.classList.contains("active")) {
        navbarLinks.classList.remove("active");
        ChangeHamburgerMenuColor("#FFF");

        header.style.height = "15vh";
    }
    else {
        navbarLinks.classList.add("active");
        ChangeHamburgerMenuColor("BBA147");

        header.style.height = "fit-content";
    }
});

//Have the hamburger menu change color on hover.
hamburgerMenu.addEventListener('mouseover', () => {
    if(!navbarLinks.classList.contains("active")) {
        ChangeHamburgerMenuColor("#BBA147");
    }
});

hamburgerMenu.addEventListener('mouseleave', () => {
    if(!navbarLinks.classList.contains("active")) {
        ChangeHamburgerMenuColor("#FFF");
    }
});

//Get the page the user is going to.
const url = window.location.href.split('#');
let page = "home";
if (url.length > 1) {
    page = url[1];
}
ChangePage(page);



function ChangePage(page) {
    //Highlight the navbar element for the current page.
    let nbOptions = Array.from(document.querySelectorAll("#navbarLinks > a"));
    nbOptions.forEach((nbOption, index) => {
        if(nbOption.id == `nb${page}`) {
            nbOption.style.color = "#BBA147";
        }
        else {
            nbOption.style.color = "#FFF";
        }
    });

    //Show the content of the current page.
    let sections = Array.from(document.getElementsByTagName("section"));
    sections.forEach((section, index) => {
        if(section.id == page) {
            section.classList.add("show");
        }
        else {
            section.classList.remove("show");
        }
    });

    //Hide the navbar drop down for smaller screens upon selection.
    navbarLinks.classList.remove("active");
    ChangeHamburgerMenuColor("#FFF");
}

function ChangeHamburgerMenuColor(hexColorString) {
    hamburgerMenuBars.forEach((bar, index) => {
        bar.style.backgroundColor = hexColorString;
    });
}