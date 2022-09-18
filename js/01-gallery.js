import { galleryItems } from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.gallery'),
};

refs.gallery.addEventListener('click', onImageClick);

refs.gallery.innerHTML = createGaleryElement(galleryItems);

function createGaleryElement(galleryItems) {
  return galleryItems
    .map(item => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </div>`;
    })
    .join('');
}

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  openModal(event);
}

function openModal(event) {
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();

  closeModal(instance);
}

function closeModal(instance) {
  refs.gallery.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      instance.close();
    }
  });
}
