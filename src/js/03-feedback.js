import throttle from 'lodash.throttle';
import "simplelightbox/dist/simple-lightbox.min.css";

const pageForm = document.querySelector('.feedback-form');
const pageEmail = document.querySelector('input');
const pageMessage = document.querySelector('textarea');
const pageButton = document.querySelector('button');

getSaveMessage()

console.log(pageButton)

let formData;

pageForm.addEventListener('input', throttle(enterText, 1000));
pageForm.addEventListener('submit', sendText);

function enterText() {
    formData = {
        email: pageEmail.value,
        message: pageMessage.value
    }
    localStorage.setItem("feedback-form-state", JSON.stringify(formData))

}

function sendText(event) {
    event.preventDefault();
    event.target.reset();
    localStorage.removeItem("feedback-form-state")
    console.log(formData);
}

function getSaveMessage() {
    const saveMessage = JSON.parse(localStorage.getItem("feedback-form-state"));
    if (saveMessage) {
        pageEmail.value = saveMessage.email,
        pageMessage.value = saveMessage.message
    }
}