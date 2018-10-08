'use strict';

(function () {
  // проверка валидности карты
  var PAYMENT = window.util.tabs.PAYMENT;
  var CARD_NUMBER = PAYMENT.querySelector('#payment__card-number');
  var CARD_DATE = PAYMENT.querySelector('#payment__card-date');
  var CARD_CVC = PAYMENT.querySelector('#payment__card-cvc');
  var CARD_HOLDER = PAYMENT.querySelector('#payment__cardholder');
  var CARD_STATUS = PAYMENT.querySelector('.payment__card-status');


  // Номер карты
  CARD_NUMBER.addEventListener('invalid', function () {
    var validityText = '';
    if (CARD_NUMBER.validity.tooShort || CARD_NUMBER.validity.tooLong) {
      validityText = 'Номер должен состоять из 16 цифр';
    } else if (CARD_NUMBER.validity.valueMissing) {
      validityText = 'Обязательное поле';
    } else {
      validityText = '';
    }

    CARD_NUMBER.setCustomValidity(validityText);
  });

  // Дата
  CARD_DATE.addEventListener('invalid', function () {
    var validityText = '';
    if (CARD_DATE.validity.tooShort || CARD_DATE.validity.tooLong) {
      validityText = 'Дата карты должен состоять в формате MM/ГГ';
    } else if (CARD_DATE.validity.valueMissing) {
      validityText = 'Обязательное поле';
    } else {
      validityText = '';
    }
    CARD_DATE.setCustomValidity(validityText);
  });

  // CVV
  CARD_CVC.addEventListener('invalid', function () {
    var validityText = '';
    if (CARD_CVC.validity.tooShort || CARD_CVC.validity.tooLong) {
      validityText = 'Номер должен состоять из трёх цифр';
    } else if (CARD_CVC.validity.valueMissing) {
      validityText = 'Обязательное поле';
    } else {
      validityText = '';
    }
    CARD_CVC.setCustomValidity(validityText);
  });

  // Имя держателя
  CARD_HOLDER.addEventListener('invalid', function (evt) {
    evt.preventDefault();
    var validityText = '';
    if (CARD_HOLDER.validity.patternMismatch) {
      validityText = 'Данное поле заполняется только латинскими буквами';
    } else if (CARD_HOLDER.validity.valueMissing) {
      validityText = 'Обязательное поле';
    } else {
      validityText = '';
    }
    CARD_HOLDER.setCustomValidity(validityText);
  });

  // Проверка ввода информации для карты
  // Luna
  var checkNumberCard = function (number) {
    var COUNT_CARD = 16;
    var arr = [];

    var charLess = number.replace(/\D/g, '');
    if (number.length === 0) {
      CARD_NUMBER.setCustomValidity('Обязательное поле для заполнения');
    }
    if (number.length < COUNT_CARD) {
      CARD_NUMBER.setCustomValidity('Номер должен состоять из 16 цифр');
    }
    if (isNaN(number.length)) {
      CARD_NUMBER.setCustomValidity('Проверьте правильность ввода данных 1');
    }

    if (charLess.length === COUNT_CARD) {
      CARD_NUMBER.setCustomValidity('');
      for (var i = 0; i < charLess.length; i++) {

        if (i % 2 === 0) {
          var even = Number(charLess[i]) * 2;
          if (even > 9) {
            arr.push(even - 9);
          } else {
            arr.push(even);
          }
        } else {
          var odd = Number(number[i]);
          arr.push(odd);
        }
        var sum = arr.reduce(function (a, b) {
          return a + b;
        });
      }
    } else {
      CARD_NUMBER.setCustomValidity('Проверьте правильность ввода данных');
    }
    return !!(sum % 10);
  };

  CARD_NUMBER.addEventListener('input', function () {
    if (!checkNumberCard(CARD_NUMBER.value)) {
      CARD_NUMBER.setCustomValidity('Проверьте введёное число');
    }
  });

  var PAYMENT_CARD_BLOCK = window.util.tabs.PAYMENT_CARD_BLOCK;
  PAYMENT_CARD_BLOCK.addEventListener('input', function () {

    var status = checkNumberCard(CARD_NUMBER.value);
    var valid = CARD_NUMBER.validity.valid && CARD_DATE.validity.valid && CARD_CVC.validity.valid && CARD_HOLDER.validity.valid && status;
    CARD_STATUS.textContent = valid === true ? 'Успешно' : 'Что-то пошло не так';
  });


  var SEND_ORDER = document.querySelector('.buy').querySelector('form');
  var onSuccessModal = function () {
    window.modals.MODAL_SUCCESS.classList.remove('modal--hidden');
    document.addEventListener('keydown', window.modals.onCloseModalEscPress);
    SEND_ORDER.reset();
  };
  var onErrorModal = function (errorMessage) {
    window.modals.MODAL_ERROR.classList.remove('modal--hidden');
    document.addEventListener('keydown', window.modals.onCloseModalEscPress);
    var ERROR_MESSAGE = document.querySelector('.error-message');
    ERROR_MESSAGE.textContent = errorMessage;
  };
  SEND_ORDER.addEventListener('submit', function (evt) {
    window.backend.sendData(onSuccessModal, onErrorModal, new FormData(SEND_ORDER));
    evt.preventDefault();
  });
})();
