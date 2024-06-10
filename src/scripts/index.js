// ! В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; 
// при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, 
// которым нужно будет передавать объявленные здесь переменные и обработчики.
// ---------------------------

// экспорт функции модального окна, отрывающегося при клике по изображению
export { openImagePopup };

// импорт главного файла стилей
import '../pages/index.css';
import { createCard, deleteCard, activeLikeButton, cardsContainer } from '../scripts/card.js';
import { openPopupWindow, addPopupOpened, closeModal, addPopupAnimated, removePopupOpened } from '../scripts/modal.js';
// ---------------------------

// TODO: DOM узлы

// получаю объект-заголовок профиля "Жак-Ив Кусто"
const profileTitle = document.querySelector('.profile__title');
// получаю объект-описание профиля "Исследователь океана"
const profileDescription = document.querySelector('.profile__description');
// кнопка(+) открытия окна добавления карточки
const openAddButton = document.querySelector('.profile__add-button');
// ---------------------------

// *-- DOM узлы формы редактирования профиля пользователя --

// получаю объект-родитель, в котором находится форма пользователя
const popapProfile = document.querySelector('.popup_type_edit');
// получаю форму редактирования профиля пользователя
const formEditProfile = document.forms['edit-profile'];

// получаю элементы формы профиля пользователя через свойство формы elements
// форма редактирования профиля пользователя. Имя.
const nameInput = formEditProfile.elements.name;
// форма редактирования профиля пользователя. Описание занятия.
const jobInput = formEditProfile.elements.description;
// получаю кнопку-ручку открытия окна редактирования профиля
const openEditButton = document.querySelector('.profile__edit-button');
// ---------------------------

// *-- DOM узлы формы добавления нового места --

// получаю div-контейнер добавления карточки нового места
const placePopup = document.querySelector('.popup_type_new-card');
const boxPopupNewCard = document.querySelector('.popup_type_new-card');
// получаю форму добавления карточки нового места
const formElementPlace = document.forms['new-place'];
// получаю инпут для введения названия места новой карточки
const nameNewCard = formElementPlace.querySelector('.popup__input_type_card-name');
// получаю инпут для ссылки на картинку нового места
const linkNewCard = formElementPlace.querySelector('.popup__input_type_url');
// получаю кнопку формы нового места
const saveButtonNewCard = formElementPlace.querySelector('.popup__button');
// ---------------------------

// *-- DOM узлы данные для модального окна большой картинки --

// получаю объект div-контейнер для модального окна большой картинки
const popupImageWindow = document.querySelector('.popup_type_image');
// ещё один div
const popupContentImage = popupImageWindow.querySelector('.popup__content_content_image');
// картинка
const popupImage = popupContentImage.querySelector('.popup__image');
// описание
const popupCaptionImage = popupContentImage.querySelector('.popup__caption');
// ---------------------------

// ! общие DOM узлы. Переносить выше нельзя, потомучто пропадают картинки

// получаю все кнопки: картинки и форм "редакции профиля","новое место"
const closePopupButtons = document.querySelectorAll('.popup__close');

// ---------------------------

// *-- ввод данных в форму редактирования профиля --
// вызываю функцию добавления класса popup_is-animated
addPopupAnimated(popapProfile);

function handleFormSubmit(evt) {
  // отменяю стандартную отправку формы
  evt.preventDefault();
  // вставляю новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  
  // вызываю функцию удаления класса popup_is-opened
  removePopupOpened(popapProfile);
}

// прикрепляю обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormSubmit);
// ---------------------------

// *-- ввод данных в форму добавления новой карточки --

function createNewCardData(evt) {
  // отменяю стандартную отправку формы
  evt.preventDefault();
  
  // создаю новый объект по синтаксису "конструктор объекта"
  const newCardData = new Object();
  // наполняю новый объект значениями, введённые в поля формы инпутов новой карточки
  newCardData.name = nameNewCard.value;
  newCardData.link = linkNewCard.value;

  const postNewCard = createCard(newCardData, deleteCard, activeLikeButton, openImagePopup);
  
  // добавляю карточку на страницу в начало
  cardsContainer.prepend(postNewCard);
  // сбрасываю значения полей ввода
  evt.target.reset();
  
  // вызываю функцию удаления класса popup_is-opened
  removePopupOpened(boxPopupNewCard);
  }
  
  // прикрепляю обработчик к форме добавления карточки нового места
  // он будет следить за событием “submit” - «отправка»
  formElementPlace.addEventListener('submit', createNewCardData);
// ---------------------------

// *-- функция отрытия большой картинки --

// передаю её аргументом в функцию создания карточки createCard в параметр openPopupCallBack
function openImagePopup(initialCards) {
  
  //картинка модального окна - элемент массива картинок
  popupImage.src = initialCards.link;
  
  // текст модального окна - элемент массива картинок
  popupCaptionImage.textContent = initialCards.name;
  
  // alt картинки модального окна - название картинок из массива
  popupCaptionImage.alt = initialCards.name;
  
  // вызываю функцию добавления класса popup_is-opened
  // аргумент - div-контейнер для модального окна большой картинки
  addPopupOpened(popupImageWindow);
  // вызываю функцию добавления класса popup_is-animated
  addPopupAnimated(popupImageWindow);
  }
// ---------------------------

// *-- закрытие модальных окон по клику на крестик --
closePopupButtons.forEach(closeModal);

// ---------------------------

// *-- вызов функций открытия модального окна по кнопке --

openPopupWindow(openEditButton, popapProfile);
openPopupWindow(openAddButton, boxPopupNewCard);

// ---------------------------
