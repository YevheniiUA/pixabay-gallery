import galleryService from './services/gallery-service';
import galleryListItemsTemplate from '../templates/gallery-items.hbs';
import openModal from './services/open-modal';
import { lazyLoad } from './services/lazy-load';

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
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lazyLoad(document.querySelectorAll('.gallery__image'));
  openModal.start(refs.gallery);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
