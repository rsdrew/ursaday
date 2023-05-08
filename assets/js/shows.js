//Disable ticket links if the show has passed
const ticketButtons = document.querySelectorAll('.ticket-button');

ticketButtons.forEach(button => {
    const showDate = new Date(button.dataset.showDate);
    const today = new Date();
    if (showDate < today) {
        button.disabled = true;
    }
})