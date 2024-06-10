// ! файл для работы модальных окон
// из чек-листа: в файле modal.js описаны функции для работы с модальными окнами: 
// функция открытия модального окна,
// функция закрытия модального окна,
// функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею;
// ---------------------------

export { openPopupWindow, closeModal, addPopupOpened, addPopupAnimated, removePopupOpened };
// ---------------------------

// *-- функция открытия модального окна по крестику --
function openPopupWindow(button, window) {
  button.addEventListener('click', function (event) {
    addPopupOpened(window);
  });
}

// *-- функция закрытия модального окна по крестику --
function closeModal(button) {
  const popupToClose = button.closest('div.popup');
  button.addEventListener('click', function (event) { 
    removePopupOpened(popupToClose);
    addPopupAnimated(popupToClose);
  });
}

// *-- функция закрытия модального окна по оверлею --
function closeModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupToClose = document.querySelector('.popup_is-opened');
    removePopupOpened(popupToClose);
  }
}

// *-- функция закрытия модального окна по esc --
function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    removePopupOpened(openedPopup);
  }
}

// *-- функция добавления класса popup_is-opened --
function addPopupOpened(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalByEsc);
}

// *-- функция удаления класса popup_is-opened --
function removePopupOpened(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeModalByOverlay);
  document.removeEventListener('keydown', closeModalByEsc);
}

// *-- функция удаления класса popup_is-animated --
function addPopupAnimated(popup) {
  popup.classList.add('popup_is-animated');
}
