document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".slide-in");

    function slideInElements() {
        elements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight - 10) {
                element.classList.add('slide-in--activate');
            }
        })
    }

    window.addEventListener('scroll', slideInElements);
    slideInElements();
})