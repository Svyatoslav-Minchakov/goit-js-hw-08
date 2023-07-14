// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line
// console.log(galleryItems)


const galleryItemsArray = galleryItems.map(item => {
  return `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
     <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
  </a>
</li>`
}).join('');

const galleryContainer = document.querySelector('.gallery');

galleryContainer.insertAdjacentHTML('beforeend', galleryItemsArray);

galleryContainer.addEventListener('click', openImage);



let lightbox;

function openImage(event) {
  event.preventDefault();
  if(event.target.tagName !== 'IMG') return;
  lightbox = new SimpleLightbox('.gallery a', {captionsData: 'Alt', captionDelay: '250'});
  galleryContainer.removeEventListener('click', openImage);
}
