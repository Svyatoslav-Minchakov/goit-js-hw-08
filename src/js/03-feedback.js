import throttle from 'lodash.throttle';
import "simplelightbox/dist/simple-lightbox.min.css";

const pageForm = document.querySelector('.feedback-form');
const pageEmail = document.querySelector('input');
const pageMessage = document.querySelector('textarea');

let formData = null;

getSaveMessage()

pageForm.addEventListener('input', throttle(enterText, 1000));
pageForm.addEventListener('submit', sendText);

function enterText() {
    formData = {
        email: pageEmail.value.trim(),
        message: pageMessage.value.trim()
    }
    localStorage.setItem("feedback-form-state", JSON.stringify(formData))

}

function sendText(event) {
    if (pageEmail.value === '' && pageMessage.value === '') return;
    event.preventDefault();
    event.target.reset();
    localStorage.removeItem("feedback-form-state")
    console.log(formData);
    formData = null;
}

function getSaveMessage() {
    const savedMessage = JSON.parse(localStorage.getItem("feedback-form-state"));
    if (savedMessage) {
        pageEmail.value = savedMessage.email;
        pageMessage.value = savedMessage.message;
        formData = savedMessage;
    }
    
}