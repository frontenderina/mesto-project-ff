// ! В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; 
// при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, 
// которым нужно будет передавать объявленные здесь переменные и обработчики.
// ---------------------------

// импорт главного файла стилей
import '../pages/index.css';
import { createCard, deleteCard, activeLikeButton } from '../scripts/card.js';
import { initialCards } from '../scripts/cards.js';
import { openModal, closeModal, closeModalOverlay } from '../scripts/modal.js';
// ---------------------------

// TODO: DOM узлы
// получаю объект, принадлежащий <main>
const mainContent = document.querySelector('.content');
// получаю объект-место, куда буду вставлять карточки
const cardsContainer = mainContent.querySelector('.places__list');
// ---------------------------

// получаю объект-заголовок профиля "Жак-Ив Кусто"
const profileTitle = document.querySelector('.profile__title');
// получаю объект-описание профиля "Исследователь океана"
const profileDescription = document.querySelector('.profile__description');
// ---------------------------

// *-- DOM узлы формы редактирования профиля пользователя --

// получаю объект-родитель, в котором находится форма пользователя
const popupProfile = document.querySelector('.popup_type_edit');
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
// кнопка(+) открытия окна добавления карточки
const openAddButton = document.querySelector('.profile__add-button');
// получаю div-контейнер добавления карточки нового места
const boxPopupNewCard = document.querySelector('.popup_type_new-card');
// получаю форму добавления карточки нового места
const formNewCard = document.forms['new-place'];
// получаю инпут для введения названия места новой карточки
const nameNewCard = formNewCard.querySelector('.popup__input_type_card-name');
// получаю инпут для ссылки на картинку нового места
const linkNewCard = formNewCard.querySelector('.popup__input_type_url');
// ---------------------------

// *-- DOM узлы данные для модального окна большой картинки --

// получаю объект div-контейнер для модального окна большой картинки
const boxPopupBigImage = document.querySelector('.popup_type_image');
// ещё один div
const popupContentImage = boxPopupBigImage.querySelector('.popup__content_content_image');
// картинка
const popupImage = popupContentImage.querySelector('.popup__image');
// описание
const popupCaptionImage = popupContentImage.querySelector('.popup__caption');
// ---------------------------

// ! общие DOM узлы. Переносить выше нельзя, потомучто пропадают картинки
// получаю все кнопки: картинки и форм "редакции профиля","новое место"
const closePopupButtons = document.querySelectorAll('.popup__close');
// получаю все div-контейнеры попапов: картинки и форм "редакции профиля","новое место"
const boxPopup = document.querySelectorAll('.popup');
// получаю кнопку "сохранить" для форм редактирования профиля и новой карточки
// const saveButton = document.querySelectorAll('.popup__button');
// ---------------------------

// TODO: Вывести карточки на страницу
function showCards(initialCards) {

  // перебираю массив с карточками (initialCards)
  // при forEach функция будет вызвана на каждом элементе массива поочерёдно
  initialCards.forEach(function (item) {

    // 1-й параметр - данные карточек из initialCards,
    // 2-ой параметр - функция удаления карточки
    const cardItem = createCard(item, deleteCard, activeLikeButton, openImagePopup);

    // добавляю карточку/и в конец cardsContainer
    cardsContainer.append(cardItem);
  })
}

// вывожу массив карточек на страницу, вызывая функцию
showCards(initialCards);
// ---------------------------

// *-- добавление анимации всем модальным окнам --

boxPopup.forEach(function(popup) {
  popup.classList.add('popup_is-animated');
});
// ---------------------------

// *-- закрытие всех модальных окон по крестику --

closePopupButtons.forEach(closePopupButtons => {
  const closestPopup = closePopupButtons.closest('.popup');
  closePopupButtons.addEventListener('click', () =>
    closeModal(closestPopup)
  );
});
// ---------------------------

// *-- закрытие всех модальных окон по оверлею --

// прохожу циклом по каждому div-контейнеру попапов
boxPopup.forEach(function(popup) {
  // ревьюер: нужно использовать событие mousedown, а не click, чтобы не закрыть случайно попап 
  // по оверлею,если нажать мышкой внутри попапа, а потом, не разжимая, передвинуть курсор 
  // на оверлей. Такой баг появляется с событием click.
  popup.addEventListener('mousedown', closeModalOverlay(popup));
});
// ---------------------------

// TODO: ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ

// ставлю слушатель на кнопку-ручку формы редактирования профиля пользователя
openEditButton.addEventListener('click', function () {
  // подставляю значения полей, взятыми со страницы сайта
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupProfile);
});
// ---------------------------

// *-- ввод данных в форму редактирования профиля --

function handleFormSubmit(evt) {
  // отменяю стандартную отправку формы
  // при этом перезагрузки страницы и отправки данных не произойдёт
  evt.preventDefault();
  // вставляю новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  
  // вызываю функцию закрытия модального окна редактирования профиля
  closeModal(popupProfile);
}

// прикрепляю обработчик к форме редактирования профиля
// он следит за событием “submit” - «отправка»
// таким образом сохраняю введённые данные в форму
formEditProfile.addEventListener('submit', handleFormSubmit);
// ------------------------------------------------------------------------------------------

// TODO: ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ

// ставлю слушатель на кнопку(+) открытия окна добавления карточки нового места
openAddButton.addEventListener('click', function () {
  // сбрасываю поля инпутов новой карточки
      formNewCard.reset();
  openModal(boxPopupNewCard);
});
// ---------------------------

// *-- ввод данных в форму добавления новой карточки --

function createNewCardData(evt) {
  // отменяю стандартную отправку формы
  evt.preventDefault();
  
  // создаю новый объект 
  const newCardData = {
    // наполняю новый объект значениями, 
    // введённые в поля формы инпутов новой карточки
    name: nameNewCard.value,
    link: linkNewCard.value,
  }

  const postNewCard = createCard(newCardData, deleteCard, activeLikeButton, openImagePopup);
  
  // добавляю карточку на страницу в начало
  cardsContainer.prepend(postNewCard);
  
  // вызываю функцию закрытия модального окна новой карточки
  closeModal(boxPopupNewCard);
}

// прикрепляю обработчик к форме добавления карточки нового места
// он будет следить за событием “submit” - «отправка»
formNewCard.addEventListener('submit', createNewCardData);
// ---------------------------

// TODO: ФОРМА БОЛЬШОЙ КАРТИНКИ-КАРТОЧКИ

// *-- функция отрытия большой картинки --

// передаю её аргументом в функцию создания карточки createCard в параметр openPopupCallBack
function openImagePopup(initialCards) {
  
  //картинка модального окна - элемент массива картинок
  popupImage.src = initialCards.link;
  
  // текст модального окна - элемент массива картинок
  popupCaptionImage.textContent = initialCards.name;
  
  // alt картинки модального окна - название картинок из массива
  popupCaptionImage.alt = initialCards.name;

  // вызываю функцию открытия большой картинки
  // аргумент - div-контейнер для модального окна большой картинки
  openModal(boxPopupBigImage)
}
// ------------------------------------------------------------------------------------------

// ! ПР7


// ! код из тренажёра "Валидация нескольких полей и форм"

// функция показывает ошибку, если любое из полей формы (пользователя или новой карточки) НЕвалидно
// добавляю formElement первым параметром функции. Это делает функцию универсальной.
// formElement - любая из форм, inputElement - поле input любой из форм
function showInputError(formElement, inputElement, errorMessage) {
  // выбираю элемент ошибки на основе уникального класса
  // errorElement - элемент ошибки (span), найденной внутри formElement
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // добавляю класс для невалидного inputa
  inputElement.classList.add('popup__input_type_error');
  // для span с ошибкой добавляю класс, показываю текст ошибки
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
};


// функция скрывает ошибку, если все поля одной из форм (пользователя или новой карточки) валидны
// добавляю formElement первым параметром функции. Это делает функцию универсальной.
// formElement - любая из форм, inputElement - поле input любой из форм
function hideInputError(formElement, inputElement) {
  // выбираю элемент ошибки на основе уникального класса
  // errorElement - элемент ошибки, найденной внутри formElement
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  // для span с ошибкой убираю класс, скрываю текст ошибки
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};


// функция проверяет поля input форм (пользователя и новой карточки)
function checkInputValidity(formElement, inputElement) {
  // в объекте validity есть свойство valid. В нём находится итоговое решение проверки данных. 
  // если во всех других 10 свойствах значения корректны, то поле ввода валидно и свойство valid - true.
  // если введённые данные в поле форм НЕвалидны...
  if (!inputElement.validity.valid) {
    // ...то вызываю функцию демонстрации ошибки в поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } 
  // иначе
  else {
    // ... скрываю функцию демонстрации ошибки в поле
    hideInputError(formElement, inputElement);
  }
};


// функция добавления слушателей полям форм (пользователя и новой карточки)
function setEventListeners(formElement) {
  // создаю массив из массивоподобного объекта
  // нахожу все инпуты
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  // получаю кнопку "сохранить" для форм редактирования профиля и новой карточки
  // const buttonElement = formElement.querySelectorAll('.form__submit');
  // const buttonElement = formElement.querySelectorAll('.popup__button');
  // !
  // console.log('есть кнопка?')
  

  // вызываю toggleButtonState(включает или отключает кнопку на основе данных из toggleButtonState), 
  // вызываю функцию, проверяя состояние кнопки при первой загрузке страницы.
  // так она перестанет быть активной до ввода данных в одно из полей
  // передаю ей массив полей и кнопку
  // toggleButtonState(inputList, buttonElement);

  // перебираю полученную коллекцию, проходясь по каждому полю форм
  inputList.forEach((inputElement) => {
  // каждому элементу массива добавляю обработчик события input
  // input для "живой" проверки данных, которые вводит пользователь
  // Он срабатывает при любом изменении в поле, на котором висит обработчик
  // второй аргумент - обработчик, который проверяет валидность поля
    inputElement.addEventListener('input', function () {
      // внутри колбэка вызываю функцию, передав ей форму и проверяемый элемент
      // вызываю функцию checkInputValidity на каждый ввод символа
      checkInputValidity(formElement, inputElement);

      // функция включает или отключает кнопку на основе данных из toggleButtonState
      // вызываю функцию, проверяя состояние кнопки при каждом изменении символа в любом из полей
      // вызываю toggleButtonState и передаю ей массив полей и кнопку
      // toggleButtonState(inputList, buttonElement);
    });
  });
};


// функция добавления слушателей формам (пользователя и новой карточки)
function enableValidation() {
  // создаю массив из массивоподобного объекта
  // нахожу все формы
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // перебираю полученную коллекцию, проходясь по каждой форме
    formList.forEach((formElement) => {

      // прикрепляю обработчик “submit” к форме редактирования профиля
      // “submit” проверяет данные введённые пользователем, и если есть ошибки, показывает их, вызывает event.preventDefault(), 
      // тогда форма не будет отправлена на сервер
      // функция сработает при отправке формы (в моём случае - при нажатии на "сохранить")
      formElement.addEventListener('submit', function (evt) {
      // в обработчике события submit проверяют данные, которые ввёл пользователь, и отменяют их отправку на сервер
      // отменяю стандартное поведение в обработчике submit
      evt.preventDefault();
    });
    // вызываю функцию добавления слушателей событий полям форм
    setEventListeners(formElement);
  });
}

enableValidation();

// функция проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита "сохранить"
// принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны
// function hasInvalidInput(inputList) {
  // метод some проверяет валидацию
  // Если поле не валидно, колбэк вернёт true
  // Обход массива прекратится и вся функция
  // hasInvalidInput вернёт true
  // return inputList.some((inputElement) => {

    // проверяет, является ли значение, введенное пользователем в определенный элемент (например, текстовое поле), корректным согласно заданным правилам, которые я установила
    // validity - свойство элемента формы, которое содержит информацию о том, соответствует ли значение элемента заданным правилам валидации (корректно ли оно).
    // .valid - метод, который позволяет узнать, является ли значение элемента корректным согласно заданным правилам. Если значение корректно, метод возвращает true, иначе - false.
//     return !inputElement.validity.valid;
//   });
// }

// let buttonElement = formElement.querySelectorAll('.popup__button');

// функция включает или отключает кнопку на основе данных из toggleButtonState
// функция принимает массив полей ввода и элемент кнопки "сохранить", состояние которой нужно менять
// function toggleButtonState(inputList, buttonElement) {
  // если есть хотя бы один невалидный инпут
  // if (hasInvalidInput(inputList)) {
    // делаю кнопку неактивной, назначая свойство disabled 
    // buttonElement.disabled = true;
    // !
    // console.log('кнопка активна?');
    // buttonElement.classList.add('form__submit_inactive');
    // buttonElement.classList.add('popup__button_inactive');
    // !
  //   console.log('добавился класс кнопке?');
  // } 
  // иначе
  // else {
    // делаю кнопку активной
    // buttonElement.disabled = false;
    // buttonElement.classList.remove('form__submit_inactive');
//     buttonElement.classList.remove('popup__button_inactive');
//   }
// };

// -----------------------------------------------------------------
// -----------------------------------------------------------------

