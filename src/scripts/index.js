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
// import { initialCards } from '../scripts/cards.js';
import { openModal, closeModal, closeModalOverlay } from '../scripts/modal.js';
import { validationConfig, showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, clearValidation } from '../scripts/validation.js';
// ---------------------------

// TODO: DOM узлы
// получаю объект, принадлежащий <main>
const mainContent = document.querySelector('.content');
// получаю объект-место, куда буду вставлять карточки
const cardsContainer = mainContent.querySelector('.places__list');
// ---------------------------

// получаю аватар пользователя
const profileImage = document.querySelector('.profile__image');
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

// ! ПР7. ТЕСТОВО ЗАКРЫЛА ВЫВОД КАРТОЧЕК, ПОТОМУ КАК ДАННЫЕ БЕРУ С СЕРВЕРА
// TODO: Вывести карточки на страницу
// function showCards(initialCards) {

  // перебираю массив с карточками (initialCards)
  // при forEach функция будет вызвана на каждом элементе массива поочерёдно
  // initialCards.forEach(function (item) {

    // 1-й параметр - данные карточек из initialCards,
    // 2-ой параметр - функция удаления карточки
    // const cardItem = createCard(item, deleteCard, activeLikeButton, openImagePopup);

    // добавляю карточку/и в конец cardsContainer
//     cardsContainer.append(cardItem);
//   })
// }

// вывожу массив карточек на страницу, вызывая функцию
// showCards(initialCards);
// ---------------------------

// ! ПР7. ФУНКЦИЯ, СОЗДАННАЯ С 5 СПРИНТА. ОТКРЫТА ДЛЯ ЭКСПЕРИМЕНТОВ

// TODO: Вывести карточки на страницу
function showCards(dataCards) {

  // перебираю массив с карточками (initialCards)
  // при forEach функция будет вызвана на каждом элементе массива поочерёдно
  dataCards.forEach(function (item) {

    // ?1-й параметр - данные карточек из initialCards,
    // ?2-ой параметр - функция удаления карточки
    // ! убрала временно openImagePopup из последних параметров в скобках
    const cardItem = createCard(item, deleteCard, activeLikeButton, openImagePopup);

    // добавляю карточку/и в конец cardsContainer
    cardsContainer.append(cardItem);
  })
}

// вывожу массив карточек на страницу, вызывая функцию
// ! закрыла тестово, потому как теперь подтягиваются карточки с сервера
// showCards(cardItem);
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
  // !тестово закрываю строки ниже подставляю значения полей, взятыми со страницы сайта
  // nameInput.value = profileTitle.textContent;
  // jobInput.value = profileDescription.textContent;

  // очищаю ошибки валидации и делаю кнопку неактивной вызовом функции clearValidation
  clearValidation(formEditProfile, validationConfig);
  openModal(popupProfile);
});
// ---------------------------

// *-- ввод данных в форму редактирования профиля --

// прикрепляю обработчик к форме редактирования профиля
// он следит за событием “submit” - «отправка»
// таким образом сохраняю введённые данные в форму
formEditProfile.addEventListener('submit', function(evt) {
  // отменяю стандартную отправку формы
  // при этом перезагрузки страницы и отправки данных не произойдёт
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  // ПР7 создаю новый объект
  // наполняю его значениями, введёнными в поля формы инпутов редактирования профиля
  const inputsUserInfoApi = {
    // nameInput - dom-инпут профиля пользователя. Имя.
    name: nameInput.value,
    // jobInput - dom-инпут профиля пользователя. Описание занятия.
    about: jobInput.value
  };

  // ПР7 вызываю функцию обновления инфо пользователя на сервере
  // с параметром значений полей инпутов инфо пользователя
  updateUserInfoApi(inputsUserInfoApi);

  // вызываю функцию закрытия модального окна редактирования профиля
  closeModal(popupProfile);
})
// ------------------------------------------------------------------------------------------

// TODO: ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ

// ставлю слушатель на кнопку(+) открытия окна добавления карточки нового места
openAddButton.addEventListener('click', function () {
  // сбрасываю поля инпутов новой карточки
  formNewCard.reset();
  // очищаю ошибки валидации и делаю кнопку неактивной вызовом функции clearValidation
  clearValidation(formNewCard, validationConfig);
  openModal(boxPopupNewCard);
});
// ---------------------------

// *-- ввод данных в форму добавления новой карточки --

function createNewCardData(evt) {
  // отменяю стандартную отправку формы
  evt.preventDefault();
  
  // technical
  // ? возможно эти строчки нужно закрыть комментариями, а вместо них подставить данные карточки с сервера (см.ниже)
  // ! ТЕСТ-закрытие
  // создаю новый объект 
  // const newCardData = {
    // наполняю новый объект значениями,
    // введённые в поля формы инпутов новой карточки
  //   name: nameNewCard.value,
  //   link: linkNewCard.value,
  // }

  // !ПР7 перенесла тестово строчки снизу. присваиваю ипутам новой карточки значения полей новой карточки с сервера
  // создаю новый объект
  // наполняю его значениями, введёнными в поля формы инпутов новой карточки
  const inputsNewCardApi = {
    // nameNewCard - dom-инпут для введения названия места новой карточки
    name: nameNewCard.value,
    // linkNewCard - dom-инпут для ссылки на картинку нового места
    link: linkNewCard.value
  };

  // technical
  // ? возможно эту строчку нужно закрыть и заменить на актуальную переменную
  // ! ТЕСТ-закрытие
  // const postNewCard = createCard(newCardData, deleteCard, activeLikeButton, openImagePopup);
  
  // ПР7
    const postNewCard = createCard(inputsNewCardApi, deleteCard, activeLikeButton, openImagePopup);

  // ПР7 вызываю функцию добавления новой карточки с сервера с параметром 
  // значений полей инпутов новой карточки с сервера
  postNewCardApi(inputsNewCardApi);

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

// вызов функции добавления слушателей формам (пользователя и новой карточки)
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig);
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// ! КОД НИЖЕ ДЛЯ ФАЙЛА API

// ! в коде ниже мой токен в кавычках свойства authorization 
// ! и моя когорта в кавычках fetch после слеша v1 до др. слеша
// const tokenIdCohort = {
  
// }
// return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
//   headers: {
//     authorization: 'a409d782-c5f1-42d2-b1ba-a1f104a14009'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 

// ------------------------------------------------------------------------------------------

// нет смысла выводить ни карточки без пользователя(чьи картинки), ни пользователя без карточек
// другими словами — отображать контент нужно только после того, как оба промиса будут в статусе «исполнен»

// промисы — запросы на асинхронный код. Когда мы создаём промис, мы говорим движку: выполни вот этот код 
// и по результатам переведи промис в статус «исполнен» или «отклонён»

// даю понять движку: как определить, обработан запрос или нет
// Чтобы «научить» движок обрабатывать запрос, функции Promise передают на вход функцию. Она в свою очередь тоже принимает на вход два колбэка: resolve и reject. Эти колбэки переводят промис в статус «исполнен» или «отклонён».

// 1/3 cоздаю первый промис (данных пользователя с сервера), чтобы перевести его в статус исполнен или отклонён
const promiseUserDataApi = new Promise((resolve, reject) => {
  // если длина объекта, хранящаяся в промисе от resolve больше нуля...
  // условие ? выражение1 : выражение2 - сокращённый вариант инструкции if...else
  // оператор возвращает значение выражения1, если условие верно, иначе - значение выражения2
  const userDataApi = resolve.length > 0 ? true : false;
  // !код тела условной конструкции (if/else) заключён в фигурные скобки. После них точки с запятой не нужны.
  if (userDataApi) {
    // technical
    // console.log(userDataApi); // true

    // функция resolve переводит промис в статус «исполнен», 
    // а значение, переданное этой функции, затем передаётся методу then
    resolve(userDataApi);
  } else {
    // функция reject переводит промис в статус «отклонён». Переданное этой функции 
    // значение затем передаётся на вход методу catch
    reject('Не покажу тебе данные пользователя. Напиши код правильно');
  }
});

// 2/3 cоздаю второй промис (массив карточек пользователя), чтобы перевести его в статус исполнен или отклонён
const promiseArrayCardsApi = new Promise((resolve, reject) => {
  const arrayCardsApi = resolve.length > 0 ? true : false;
  if (arrayCardsApi) {
    // technical
    // console.log(arrayCardsApi); // true
    resolve(arrayCardsApi);
  } else {
    reject('Не покажу массив карточек студентов. Напиши код правильно');
  }
});

// 3/3 cоздаю массив с промисами пользователя и карточек
const promisesUserArrayCardsApi = [promiseUserDataApi, promiseArrayCardsApi]
// статический метод Promise.all принимает на вход массив с промисами ...
Promise.all(promisesUserArrayCardsApi)
  // ...и выполняет записанный в then код, когда все промисы вернулись со статусом «исполнен»
  .then((resultsPromises) => {
    // теперь когда оба промиса (пользователя и загруженных им карточек) перешли в статус исполнен
    // technical
    console.log(resultsPromises); // [true, true]
    // вызываю функции, чтобы отобразить на странице данные пользователя и карточки
    showUserDataApi();
    showArrayCardsApi();
  });

// ---------------------------

// *функция загрузки информации о пользователе с сервера

function showUserDataApi() {
  // метод fetch создаёт запрос на сервер и возвращает его ответ
  // получаю данные с сервера сайта, делая GET-запрос
  // метод GET явно можно не прописывать. Он по умолчанию. 
  fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
      headers: {
      authorization: 'a409d782-c5f1-42d2-b1ba-a1f104a14009'
    }
  })
  // метод fetch асинхронный, при вызове он создаёт промис, а когда этот метод получает ответ,
  // то переводит промис в нужный статус. Ответ от сервера при этом записывается в промис
  // результатом первого then будет промис с ответом. Из него потом можно доставать нужные данные
  .then((res) => {
    // console.log(res) - на этом шаге в консоли ответ от сервера (response, type: "cors" в консоли); много служебной информации (например, код ответа и др.)
    // непосредственно данных, которые мне нужны здесь нет

    // вызываю метод json, чтобы получить данные о пользователе от сервера
    // данные записаны в промис
    return res.json();
  })
  // если попала в этот then, то userDataApi — это объект, который хранился в промисе
  // из объекта беру свойства и использую в соответствующих элементах шапки страницы
  .then((userDataApi) => {
    // console.log(userDataApi); // здесь уже вижу объект с данными пользователя
    
    // заголовку профиля (в index.html - Жак-Ив Кусто) присваиваю значение свойства ключа name, из полученного объекта с сервера
    // свойство textContent позволяет получить или перезаписать текстовое содержимое элемента. Вёрстка при этом не затрагивается.
    profileTitle.textContent = userDataApi.name;
   
    // описанию профиля (в index.html - Исследователь океана) присваиваю значение свойства ключа about, из полученного объекта с сервера
    // не рекомендуют обращаться к свойству textContent тех элементов, в которые вложены другие.
    // иначе строки склеятся, игнорируя разметку.
    profileDescription.textContent = userDataApi.about;
    
    // вычисляемое выражения внутри фигурных скобок со знаком доллара в начале ${...}
    // ${...} (фигурные скобки со знаком доллара в начале) - синтаксис вычисляемого выражения
    profileImage.style = `background-image: url('${userDataApi.avatar}')`;
  })
  // если интернет отвалился, формат данных неверный и т.д. - покажу ошибку здесь
  .catch((err) => {
    console.log('Не видать тебе данных пользователя. Ошибка: ', err);
  })
}
// ---------------------------

// ! ТЕСТОВ повторно отображаю переменные. Они находятся в других файлах. Разобраться потом с этим при необходимости.
// получаю содержимое template
const cardTemplate = document.querySelector('#card-template').content;
// получаю объект, включающий фото, кнопку-корзину, заголовок, кнопку-лайк
// клонирую со всеми потомками методом (cloneNode(true))
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
const a = cardElement.querySelector('.card__title');


// *функция загрузки карточек студентов с сервера
  
function showArrayCardsApi() {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
      headers: {
      authorization: 'a409d782-c5f1-42d2-b1ba-a1f104a14009'
    }
  })
  // при успешном ответе получаю в промисе массив карточек, загруженных студентами моей когорты
  .then((res) => {
    return res.json();
  })
  //  получаю из промиса массив карточек, загруженных студентами моей когорты
  .then((arrayCardsApi) => {

    // !получаю template-картинку. Так она находится в другом файле и не отображается. Нужно импортировать
    const cardImage = cardElement.querySelector('.card__image');
    // console.log(cardImage);
    
    const colbasiv = arrayCardsApi;
    cardImage.src = colbasiv.link;
    a.textContent = colbasiv.name;

    cardsContainer.append(colbasiv.link);
    cardsContainer.append(colbasiv.name);

    showCards(colbasiv);
  })
  .catch((err) => {
    console.log('Не показывает сервер карточки других студентов. Ошибка: ', err);
  })
}
// ---------------------------

// ? вариант 2 для промисов пока не убирать
// статический метод Promise.all принимает на вход массив 
// с функциями демонстрации данных пользователя с сервера и карточек с сервера
// Promise.all([showUserDataApi, showArrayCardsApi])
  // ...и выполняет записанный в then код, когда все промисы вернулись со статусом «исполнен»
  // .then((values) => {
    // console.log(values); //[showUserDataApi(), showArrayCardsApi()]

    // вызываю функции, чтобы отобразить на странице данные пользователя и карточки
  //   showUserDataApi();
  //   showArrayCardsApi();
  // });

// ---------------------------

// const newCardApi = {
//   name: 'Птычка',
//   link: 'https://pic.rutubelist.ru/video/bc/0b/bc0b6490ff2d7151ff4c2b2c21a195fe.jpg',
// };

// *функция добавления новой карточки с сервера

function postNewCardApi(newCardApi) {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    // использую метод POST для отправки данных на сервер
    method: 'POST',
    headers: {
      authorization: 'a409d782-c5f1-42d2-b1ba-a1f104a14009',
      'Content-Type': 'application/json'
    },
    // преобразую объект newCardApi методом JSON.stringify в строку (ключ и значение 
    // в двойных кавычках) для передачи серверу
    body: JSON.stringify(newCardApi)
  })
  // метод json читает ответ от сервера в формате json и возвращает промис
  // из этого промиса потом можно доставать нужные нам данные
  .then((res) => {
    return res.json()
  })

  .then((result) => {
    console.log(result) // объект загруженной мною карточки с сервера, расшифрованной методом JSON (уже с одинарными кавычками в консоли)
  })

  .catch((err) => {
    console.log('Не добавляется корректно моя карточка на сервер. Ошибка: ', err);
  })
}

// ---------------------------

// отредактированные данные профиля должны сохраняться на сервере. 
// Для этого отправляю запрос методом PATCH. 
// Он подходит для частичного обновления ресурса, применяется только к изменному фрагменту.
// получаю данные методом PATCH

// const newInfoUserApi = {
  //   name: 'Красная шапочка',
  //   about: 'Курьер'
  // };

// *функция обновления информации при редактировании профиля

function updateUserInfoApi(newInfoUserApi) {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'a409d782-c5f1-42d2-b1ba-a1f104a14009',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newInfoUserApi)
  })
  .then((res) => {
    // responce-объект (не в промисе) инфо о пользователе, но без добавленных мною данных (name, about)
    // console.log(res);
    return res.json();
  })
  .then((result) => {
    // объект с добавленными мною данными (name, about) из newInfoUserApi
    // console.log(result)
  })
  .catch((err) => {
    console.log('Не обновляет инфо при редактировании профиля. Ошибка: ', err);
  })
}

// -------
