// ФАЙЛ ФУНКЦИЙ ДЛЯ РАБОТЫ С КАРТОЧКАМИ
// !ревьюер: модуль card отвечает только за работу с разметкой одной карточки 
// !и не должен содержать другого функционала по работе самого сайта
// !Импортов в модули не должно быть. Модуль не должен зависеть от кода других скриптов.
// ---------------------------

export { createCard, deleteCard, activeLikeButton };
// ---------------------------

// TODO: Функция создания ОДНОЙ карточки
const createCard = (card, deleteCard, like, openImagePopup) => {

  // получаю содержимое template
  const cardTemplate = document.querySelector('#card-template').content;
  // получаю объект, включающий фото, кнопку-корзину, заголовок, кнопку-лайк
  // клонирую со всеми потомками методом (cloneNode(true))
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  // получаю template-картинку
  const cardImage = cardElement.querySelector('.card__image');
  
  // к найденным объектам добавляю информацию из массива карточек (файл cards.js)
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  
  // получаю кнопку-корзину, которая удаляет карточку
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  
  // вешаю слушатель на кнопку-корзину
  // 2-й параметр - функция-колбэк, которая сработает при клике и удалит карточку
  cardDeleteButton.addEventListener('click', deleteCard);
  
  // получаю кнопку-лайк template-картинки
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  // вешаю слушатель на кнопку, по клику запускаю колбэк-функцию добавления лайка на карточку
  cardLikeButton.addEventListener('click', () => {
    // вызываю функцию добавления лайка на карточку
    activeLikeButton(cardLikeButton);
    });

  cardImage.addEventListener('click', () => {
    // вызываю функцию открытия большой картинки
    openImagePopup(card);
  });

  // результат работы функции - подготовленная к выводу карточка. Карточка пока не выведена.
  return cardElement;
}
// ---------------------------

// *-- функция удаления одной карточки --
function deleteCard(evt) {

  // closest возвращает ближайший родительский элемент с переданным селектором
  const cardElementDeleted = evt.target.closest('.card');
  cardElementDeleted.remove(); //убираю карточку
}
// ---------------------------

// *-- функция добавления like на карточку --
// передаю эту функцию аргументом в функцию создания карточки createCard, подставляя в параметр Like
function activeLikeButton(button) {
  // методом toggle добавляю класс-active карточке, которой ставлю лайк
  // и им же убираю класс, если убираю лайк. То есть переключает класс
  button.classList.toggle('card__like-button_is-active');
};
// ---------------------------