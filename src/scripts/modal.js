// ФАЙЛ ДЛЯ РАБОТЫ МОДАЛЬНЫХ ОКОН
// ---------------------------

export { closeModalEsc, openModal, closeModal, closeModalOverlay };
// ---------------------------

// *-- функция закрытия модального окна по esc --
function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}
// ---------------------------

// *-- функция открытия модальных окон --
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
}
// ---------------------------

// *-- функция закрытия модальных окон --
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}
// ---------------------------

// *-- функция закрытия модальных окон по оверлею --

function closeModalOverlay(popup) {
  return function (event) {
    if (event.target === popup || event.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  };
}

const boxPopup = document.querySelectorAll('.popup');

boxPopup.forEach(function(popup) {
  popup.addEventListener("click", closeModalOverlay(popup));
});

// ------------------------------------------------------------------------------------------

