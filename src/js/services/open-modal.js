export default {
  refs: {
    ovelray: document.querySelector('.overlay'),
    ovelrayImg: document.querySelector('#overlay-img'),
    closeBtn: document.querySelector('button[data-action="close-modal"]'),
  },

  start(gallery) {
    gallery.addEventListener('click', this.handlerGalleryClick.bind(this));
  },

  handlerGalleryClick(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      return;
    }
    const currentImg = e.target;
    const originalSrc = currentImg.dataset.source;
    const altImg = currentImg.alt;
    this.refs.ovelrayImg.setAttribute('src', originalSrc);
    this.refs.ovelrayImg.setAttribute('alt', altImg);
    this.openModal();
  },

  openModal() {
    this.refs.ovelray.classList.add('is-visible');
    this.refs.ovelray.addEventListener(
      'click',
      this.handlerCloseOverlay.bind(this),
    );
    this.refs.closeBtn.addEventListener(
      'click',
      this.handlerCloseBtn.bind(this),
    );
    window.addEventListener('keydown', this.handlerKeyPress.bind(this));
  },

  handlerCloseBtn(e) {
    this.closeModal();
  },

  handlerCloseOverlay(e) {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  },

  handlerKeyPress(e) {
    if (e.code !== 'Escape') {
      return;
    }
    this.closeModal();
  },

  closeModal() {
    this.refs.ovelray.classList.remove('is-visible');
    this.refs.ovelrayImg.setAttribute('src', '');
    window.removeEventListener('keydown', this.handlerKeyPress.bind(this));
  },
};
