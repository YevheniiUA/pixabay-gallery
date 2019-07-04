import galleryService from './services/gallery-service';
import galleryListItemsTemplate from '../templates/gallery-items.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormSubmitHandler(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  galleryService.resetPage();
  galleryService.searchQuery = input.value;
  fetchImages();

  input.value = '';
}

function loadMoreBtnHandler() {
  fetchImages();
}

function fetchImages() {
  galleryService
    .fetchImages()
    .then(images => {
      isertListItems(images);
    })
    .catch(error => {
      console.warn(error);
    });
}

function isertListItems(items) {
  const markup = galleryListItemsTemplate(items);
  console.log(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
