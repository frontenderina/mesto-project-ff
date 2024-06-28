// ! ПР7

export { validationConfig, clearValidation, enableValidation, showInputError, hideInputError, checkInputValidity, setEventListeners, hasInvalidInput, toggleButtonState };
// ---------------------------

// *-- объект с настройками валидации (все нужные функциям классы и селекторы элементов) --

const validationConfig = {
  // формы пользователя и новой карточки
  // получаю значение ключа-свойства - validationConfig.formSelector, чтобы заменить в разных функциях кода класс .popup__form
  formSelector: '.popup__form',
  // инпут-поля форм пользователя и новой карточки
  inputSelector: '.popup__input', // validationConfig.inputSelector
  // кнопки "сохранить" форм пользователя и новой карточки
  submitButtonSelector: '.popup__button', // validationConfig.submitButtonSelector
  // класс выключенных кнопок "сохранить" форм
  inactiveButtonClass: 'popup__button_disabled', // validationConfig.inactiveButtonClass
  // класс для невалидного inputa полей
  inputErrorClass: 'form__input_type_error', // validationConfig.inputErrorClass
  // класс ошибки span-полей форм 
  errorClass: 'form__input-error_active' // validationConfig.errorClass
};
// ---------------------------

// *-- функция демонстрации ошибки, если любое из полей формы (пользователя или новой карточки) НЕвалидно --

// делаю функцию универсальной, добавляя formElement первым параметром функции
// formElement - любая из форм, inputElement - поле input любой из форм
function showInputError(formElement, inputElement, errorMessage) {
  
  // выбираю элемент ошибки на основе уникального класса
  // errorElement - элемент ошибки (span), найденной внутри formElement
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // добавляю класс для невалидного inputa
  // класс-значение беру из функции validationConfig
  inputElement.classList.add(validationConfig.inputErrorClass);
  // для span с ошибкой добавляю класс, показываю текст ошибки
  // validationConfig.errorClass - класс-значение из функции validationConfig
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};
// ---------------------------

// *-- функция скрытия ошибки, если все поля одной из форм (пользователя или новой карточки) валидны --

// делаю функцию универсальной, добавляя formElement первым параметром функции
// formElement - любая из форм, inputElement - поле input любой из форм
function hideInputError(formElement, inputElement) {
  // выбираю элемент ошибки на основе уникального класса
  // errorElement - элемент ошибки, найденной внутри formElement
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // удаляю класс для inputa
  // класс-значение беру из функции validationConfig
  inputElement.classList.remove(validationConfig.inputErrorClass);
  // для span с ошибкой убираю класс, скрываю текст ошибки
  // validationConfig.errorClass - -класс-значение из функции validationConfig
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};
// ---------------------------

// *-- функция проверки полей input форм (пользователя и новой карточки) --

function checkInputValidity(formElement, inputElement) {
  // свойство patternMismatch в объекте validity отвечает за проверку ввода регулярным выражением. Если поле 
  // равно true, значит, введённый текст не прошёл проверку
  if (inputElement.validity.patternMismatch) {

    // встроенный метод setCustomValidity заменяет сообщение от браузера об ошибке
    // на пользовательское, хранящееся в атрибуте data-error-message (index.html)
    // данные атрибута доступны у элемента инпута через ключевое слово dataset
    // !внимание, в js имя атрибута пишется в camelCase (а в HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  // иначе
  else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity('');
  }
  // теперь, если ошибка вызвана регулярным выражением,
  // в объекте validity есть свойство valid. В нём находится итоговое решение проверки данных. 
  // если во всех других 10 свойствах значения корректны, то поле ввода валидно и свойство valid - true.
  // если введённые данные в поле форм НЕвалидны...
  if (!inputElement.validity.valid) {
    // ...то вызываю функцию демонстрации ошибки в поле
    // третьим аргументом передаю сообщение об ошибке, которое получаю из validationMessage
    // переменная validationMessage хранит кастомное (пользовательское) сообщение
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } 
  else {
    // ... скрываю функцию демонстрации ошибки в поле
    hideInputError(formElement, inputElement);
  }
}
// ---------------------------

// *-- функция добавления слушателей полям форм (пользователя и новой карточки) --

function setEventListeners(formElement) {
  // создаю массив из массивоподобного объекта
  // нахожу все инпуты 
  // validationConfig.inputSelector - нахожу значение-класс из функции validationConfig
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  // получаю кнопку "сохранить" для форм редактирования профиля и новой карточки
  // validationConfig.submitButtonSelector - значение-класс из функции validationConfig
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  // вызываю toggleButtonState(включает или отключает кнопку на основе данных из toggleButtonState), 
  // вызываю функцию, проверяя состояние кнопки при первой загрузке страницы.
  // так она перестанет быть активной до ввода данных в одно из полей
  // передаю ей массив полей и кнопку
  toggleButtonState(inputList, buttonElement);

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
      toggleButtonState(inputList, buttonElement);
    });
  });
};
// ---------------------------

// *-- функция добавления слушателей формам (пользователя и новой карточки) --

function enableValidation() {
  // создаю массив из массивоподобного объекта
  // нахожу все формы
  // validationConfig.formSelector - нахожу значение-класс из функции validationConfig
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
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
};
// ---------------------------

// *-- функция проверки наличия невалидного поля и подачи сигнала кнопке "сохранить" (можно ли разблокировать) --

// принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно; и false, если все валидны
function hasInvalidInput(inputList) {
  // метод some проверяет валидацию
  // если поле не валидно, колбэк вернёт true
  // обход массива прекратится и вся функция
  // hasInvalidInput вернёт true
  return inputList.some((inputElement) => {

    // проверяет, является ли значение, введенное пользователем в определенный элемент (например, текстовое поле), корректным согласно заданным правилам, которые я установила
    // validity - свойство элемента формы, которое содержит информацию о том, соответствует ли значение элемента заданным правилам валидации (корректно ли оно).
    // .valid - метод, который позволяет узнать, является ли значение элемента корректным согласно заданным правилам. Если значение корректно, метод возвращает true, иначе - false.
    return !inputElement.validity.valid;
  });
}
// ---------------------------

// *-- функция состояния кнопки (вкл/выкл) на основе данных из hasInvalidInput --

// принимает массив полей ввода и элемент кнопки "сохранить", состояние которой нужно менять
function toggleButtonState(inputList, buttonElement) {
  // если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // делаю кнопку неактивной, назначая свойство disabled
    buttonElement.disabled = true;
    // добавляю класс, получая значение из функции validationConfig
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
  // иначе
  else {
    // делаю кнопку активной
    buttonElement.disabled = false;
    // удаляю класс, получая значение из функции validationConfig
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};
// ---------------------------

// *-- функция очистки ошибок валидации формы и назначения состояния кнопки (вкл/выкл) --

// параметр 1 - элемент формы, для которой очищаются ошибки валидации
// параметр 2 - объект с настройками валидации
function clearValidation(formToClear, validationConfig) { 
  
  // создаю массив из массивоподобного объекта
  // нахожу все инпут-поля форм пользователя и новой карточки
  // validationConfig.inputSelector - нахожу значение-класс из функции validationConfig
  const inputsToClear = Array.from(formToClear.querySelectorAll(validationConfig.inputSelector));

  // нахожу кнопки "сохранить" форм пользователя и новой карточки
  const buttonToUnactive = formToClear.querySelector(validationConfig.submitButtonSelector);
  // прохожу циклом по каждому инпуту
  inputsToClear.forEach((inputToClear) => {
      // вызываю функцию, которая скрывает ошибку, если все поля одной из форм валидны
      hideInputError(formToClear, inputToClear, validationConfig);
  });

  // делаю неактивными кнопки "сохранить" форм, добавляя класс выключенных кнопок 
  // validationConfig.inactiveButtonClass - нахожу значение-класс из функции validationConfig
  buttonToUnactive.classList.add(validationConfig.inactiveButtonClass);
};
// -----------------------------------------------------------------