document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".slide-in");

    function slideInElements() {
        elements.forEach(element => {
            const elementOffset = element.getBoundingClientRect().top;
            const elementHeight = element.clientHeight;

            if (element.id == 'mailing-list-sub-header') {
                console.log(`window.scrollY: ${window.scrollY}`);

                console.log(`elementOffset: ${elementOffset}`);
                console.log(`window.innerHeight: ${window.innerHeight}`);
                console.log(`elementHeight: ${elementHeight}`);
                
                console.log(`output: ${elementOffset - window.innerHeight / 10}`)
    
                console.log('');
            }

            if (elementOffset < window.innerHeight - 10) {
                element.classList.add('slide-in--activate');
            }
        })
    }

    window.addEventListener('scroll', slideInElements);
    slideInElements();
})