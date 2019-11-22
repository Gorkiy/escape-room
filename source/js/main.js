'use strict';

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var askFormButton = document.querySelector('.ask-form__button');
var askLink = document.querySelector('.page-footer__ask-link');
var locationLink = document.querySelector('.page-header__location');
var pageHeader = document.querySelector('.page-header');

// Поведение навигации
navMain.classList.remove('main-nav--nojs');
navToggle.addEventListener('click', function () {
  navMain.classList.toggle('main-nav--closed');
  navMain.classList.toggle('main-nav--opened');
  pageHeader.classList.toggle('page-header--fixed');
});

// Валидация формы
var form = document.querySelector('.ask-form');

function checkFormState() {
  var inputs = form.querySelectorAll('input');
  var isReady = true;

  for (let input of inputs) {
    if (input.type === 'checkbox' && !input.checked) isReady = false;
    if (!input.value) isReady = false;
    if (input.id === 'email' && input.validity.typeMismatch) isReady = false;
  }
  return isReady;
};

form.addEventListener('input', function (evt) {
  // Поведение кнопки отправки формы
  var isReady = checkFormState();
  if (isReady) {
    askFormButton.disabled = false;
  } else {
    askFormButton.disabled = true;
  }
  // Обработка ошибок и поведение сползающих лейблов
  var input = evt.target.closest('.ask-form__input');
  var row = evt.target.closest('.ask-form__row');

  if (input) {
    var errorMsg = row.querySelector('.ask-form__msg');
    var label = row.querySelector('.ask-form__label');

    if (input.value) {
      label.classList.add('ask-form__label--filled');
    }

    if (input.id === 'email') {
      if (input.validity.typeMismatch) {
        errorMsg.innerText = 'Введён некорректный e-mail, попробуйте заново';
        errorMsg.classList.remove('visually-hidden');
        input.classList.add('ask-form__input--invalid');
      } else {
        errorMsg.innerText = '';
        errorMsg.classList.add('visually-hidden');
        input.classList.remove('ask-form__input--invalid');
      }
    }
  }
});

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var question = document.getElementById('question').value;

  var userQuestion = {
    name,
    email,
    question
  };
  localStorage.setItem('userQuestion', JSON.stringify(userQuestion));
});

form.addEventListener('focusin', function (evt) {
  var input = evt.target.closest('.ask-form__input');
  var row = evt.target.closest('.ask-form__row');

  if (input) {
    var label = row.querySelector('.ask-form__label');
    label.classList.add('ask-form__label--filled');
  }
});

form.addEventListener('focusout', function (evt) {
  var input = evt.target.closest('.ask-form__input');
  var row = evt.target.closest('.ask-form__row');

  if (input && !input.value) {
    var label = row.querySelector('.ask-form__label');
    label.classList.remove('ask-form__label--filled');
  }
});

// Модальные окна
var askModal = document.querySelector('.modal--ask');
var cityModal = document.querySelector('.modal--city');

askLink.addEventListener('click', function (evt) {
  askModal.classList.add('modal--show');
  var inputName = document.getElementById('name').focus();
});

locationLink.addEventListener('click', function (evt) {
  cityModal.classList.add('modal--show');
});

askModal.addEventListener('click', function (evt) {
  var formBox = evt.target.closest('.modal-ask');
  var closeButton = evt.target.closest('.modal__close-button');

  if (!formBox) askModal.classList.remove('modal--show');
  if (closeButton) askModal.classList.remove('modal--show');
});

cityModal.addEventListener('click', function (evt) {
  var formBox = evt.target.closest('.modal-city');
  var closeButton = evt.target.closest('.modal__close-button');

  if (!formBox) cityModal.classList.remove('modal--show');
  if (closeButton) cityModal.classList.remove('modal--show');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    askModal.classList.remove('modal--show');
    cityModal.classList.remove('modal--show');
  }
});
