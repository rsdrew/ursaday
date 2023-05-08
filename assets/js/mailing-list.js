let mailingListForm = document.getElementById('mailing-list-form');
let subscribeButton = document.getElementById('subscribe');
let mailingList = document.getElementById('mailing-list');
let mailingListOriginalHeight = mailingList.clientHeight;
let successMessage = document.getElementById('mailing-list-success');
let errorMessage = document.getElementById('mailing-list-error');

mailingListForm.addEventListener('submit', (e) => {
    e.preventDefault();

    ResetForm();
    DeactivateSubscribeButton();

    //Set original height so when the error message shows up, the height changes smoothly.
    //mailingList.style.minHeight = mailingListOriginalHeight + 'px';

    const form = e.target;
    const formData = new FormData(form); // Get form data
    
    //Add subscriber to MailerLite
    fetch(form.action, {
        method: form.method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${mailerlite_api_key}`
          },
        body: JSON.stringify({
            'email': formData.get('email') // Get email input value from form data
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data != null && data.data != null && data.data.id != null) {
            //Add subscriber to the newsletter group
            fetch(`https://connect.mailerlite.com/api/subscribers/${data.data.id}/groups/${ mailerlite_group_id }`, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${mailerlite_api_key}`
                  },
            })
            .then(response => response.json())
            .then(data => {
                if(data != null && data.data != null && data.data.id != null) {
                    ShowSuccessMessage();
                    subscribeButton.innerHTML = 'DONE';
                }
                else {
                    ShowErrorMessage();
                    ActivateSubscribeButton();
                }
            })
        }
        else {
            ShowErrorMessage();
            ActivateSubscribeButton();
        }
    })
    .catch(error => {
        ShowErrorMessage();
        ActivateSubscribeButton();
    })
});

let emailInput = document.getElementById('email-input');

emailInput.addEventListener('input', (e) => {
    ResetForm();
});

function ShowSuccessMessage() {
    successMessage.style.display = 'block';
    //mailingList.style.minHeight = mailingList.clientHeight + successMessage.clientHeight + 'px';
    successMessage.style.opacity = 1;

    errorMessage.style.opacity = 0;
    setTimeout(() => {errorMessage.style.display = 'none';}, 0)
}

function ShowErrorMessage() {
    successMessage.style.opacity = 0;
    successMessage.style.display = 'none';

    errorMessage.style.display = 'block';
    //mailingList.style.minHeight = mailingList.clientHeight + errorMessage.clientHeight + 'px';
    errorMessage.style.opacity = 1;
    
}

function ResetForm() {
    //mailingList.style.minHeight = mailingListOriginalHeight + 'px';

    subscribeButton.disabled = false;
    subscribeButton.innerHTML = 'SUBSCRIBE';

    successMessage.style.opacity = 0;
    setTimeout(() => {successMessage.style.display = 'none';}, 1000);

    errorMessage.style.opacity = 0;
    setTimeout(() => {errorMessage.style.display = 'none';}, 1000);
}

function DeactivateSubscribeButton() {
    subscribeButton.innerHTML = 'SUBMITTING';
    subscribeButton.disabled = true;
}

function ActivateSubscribeButton() {
    subscribeButton.innerHTML = 'SUBSCRIBE';
    subscribeButton.disabled = false;
}