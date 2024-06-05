// TODO: Темплейт карточки
// получаю содержимое template
const cardTemplate = document.querySelector('#card-template').content;


// TODO: DOM узлы
// получаю объект, принадлежащий <main>
const mainContent = document.querySelector('.content');
// получаю объект-место, куда буду вставлять карточки
const cardsContainer = mainContent.querySelector('.places__list');


// TODO: Функция создания ОДНОЙ карточки
const createCard = (initialCards, deleteCard) => {
  
  // получаю объект, включающий фото, кнопку-корзину, заголовок, кнопку-лайк
  // клонирую со всеми потомками методом (cloneNode(true))
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // к найденным объектам добавляю информацию из массива карточек (файл cards.js)
  cardElement.querySelector('.card__title').textContent = initialCards.name;
  cardElement.querySelector('.card__image').src = initialCards.link;
  cardElement.querySelector('.card__image').alt = initialCards.name;
  
  // получаю кнопку-корзину, которая удаляет карточку
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  // вешаю слушатель на кнопку-корзину
  // 2-й параметр - функция-колбэк, которая сработает при клике и удалит карточку
  cardDeleteButton.addEventListener('click', deleteCard);

  // результат работы функции - подготовленная к выводу карточка. Карточка пока не выведена.
  return cardElement;
}


// TODO: Функция удаления ОДНОЙ карточки
function deleteCard(evt) {
  
  // closest возвращает ближайший родительский элемент с переданным селектором
  const cardElementDeleted = evt.target.closest('.card');
  cardElementDeleted.remove(); //убираю карточку
}


// TODO: Вывести карточки на страницу
function showCards(initialCards) {

  // перебираю массив с карточками (initialCards)
  // при forEach функция будет вызвана на каждом элементе массива поочерёдно
  initialCards.forEach(function (item) {

  // 1-й параметр - данные карточек из initialCards,
  // 2-ой параметр - функция удаления карточки
    const cardItem = createCard(item, deleteCard);

    // добавляю карточку/и в конец cardsContainer
    cardsContainer.append(cardItem);
  })
}

// вывожу массив карточек на страницу, вызывая функцию
showCards(initialCards);

// ! РАБОТА НАД ПР6
// импорт главного файла стилей 
import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';
