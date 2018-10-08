'use strict';

(function () {
  var PAYMENT = window.util.tabs.PAYMENT;
  var TOGGLE_BTN_LABEL = document.querySelectorAll('.toggle-btn__label');
  var INPUT_BTN_LABE = document.querySelectorAll('.input-btn__label');
  TOGGLE_BTN_LABEL.forEach(function (item) {
    item.style.cursor = 'pointer';
  });
  INPUT_BTN_LABE.forEach(function (item) {
    item.style.cursor = 'pointer';
  });

  // Переключатель способов оплаты
  var CARD_NUMBER_FIELD = PAYMENT.querySelector('#payment__card-number');
  var CARD_DATE_FIELD = PAYMENT.querySelector('#payment__card-date');
  var CARD_CVC_FIELD = PAYMENT.querySelector('#payment__card-cvc');
  var CARD_HOLDER_FIELD = PAYMENT.querySelector('#payment__cardholder');

  var disabledCardFields = function () {
    CARD_NUMBER_FIELD.required = false;
    CARD_DATE_FIELD.required = false;
    CARD_CVC_FIELD.required = false;
    CARD_HOLDER_FIELD.required = false;
  };
  var activeCardFields = function () {
    CARD_NUMBER_FIELD.required = true;
    CARD_DATE_FIELD.required = true;
    CARD_CVC_FIELD.required = true;
    CARD_HOLDER_FIELD.required = true;
  };

  var PAYMENT_CARD = PAYMENT.querySelector('#payment__card');
  var PAYMENT_CASH = PAYMENT.querySelector('#payment__cash');
  var PAYMENT_CARD_BLOCK = PAYMENT.querySelector('.payment__card-wrap');
  var PAYMENT_CASH_BLOCK = PAYMENT.querySelector('.payment__cash-wrap');

  PAYMENT_CARD.checked = true;
  PAYMENT_CASH.checked = false;
  PAYMENT_CASH.addEventListener('click', function () {
    PAYMENT_CARD_BLOCK.classList.add('visually-hidden');
    PAYMENT_CASH_BLOCK.classList.remove('visually-hidden');
    disabledCardFields();
  });

  PAYMENT_CARD.addEventListener('click', function () {
    PAYMENT_CARD_BLOCK.classList.remove('visually-hidden');
    PAYMENT_CASH_BLOCK.classList.add('visually-hidden');
    activeCardFields();
  });


  // Переключатель способов доставки
  var DELIVERY_STORE_TAB = document.querySelector('.deliver__entry-fields-wrap');
  var STREET_FIELD = DELIVERY_STORE_TAB.querySelector('#deliver__street');
  var HOUSE_FIELD = DELIVERY_STORE_TAB.querySelector('#deliver__house');
  var FLOOR_FIELD = DELIVERY_STORE_TAB.querySelector('#deliver__floor');
  var ROOM_FIELD = DELIVERY_STORE_TAB.querySelector('#deliver__room');

  var disabledCourierFields = function () {
    STREET_FIELD.required = false;
    HOUSE_FIELD.required = false;
    FLOOR_FIELD.required = false;
    ROOM_FIELD.required = false;
  };
  var activeCourierFields = function () {
    STREET_FIELD.required = true;
    HOUSE_FIELD.required = true;
    FLOOR_FIELD.required = true;
    ROOM_FIELD.required = true;
  };

  var DELIVERY_STORE = document.getElementById('deliver__store');
  var DELIVERY_COURIER = document.getElementById('deliver__courier');
  var DELIVERY_STORE_BLOCK = document.querySelector('.deliver__store');
  var DELIVERY_COURIER_BLOCK = document.querySelector('.deliver__courier');

  DELIVERY_STORE.checked = true;
  DELIVERY_COURIER.checked = false;
  disabledCourierFields();
  DELIVERY_STORE.addEventListener('click', function () {
    DELIVERY_STORE_BLOCK.classList.remove('visually-hidden');
    DELIVERY_COURIER_BLOCK.classList.add('visually-hidden');
    disabledCourierFields();
  });

  DELIVERY_COURIER.addEventListener('click', function () {
    DELIVERY_STORE_BLOCK.classList.add('visually-hidden');
    DELIVERY_COURIER_BLOCK.classList.remove('visually-hidden');
    activeCourierFields();
  });

  // переключатель места доставки
  var mapPlace = [
    'academicheskaya',
    'chernishevskaya',
    'frunzenskaya',
    'petrogradskaya',
    'proletarskaya',
    'prosvesheniya',
    'rechka',
    'tehinstitute',
    'vasileostrovskaya',
    'vostaniya'
  ];
  var DELIVERY_STORE_LIST = document.querySelector('.deliver__store-list');
  var DELIVER_MAP = document.querySelector('.deliver__store-map-wrap');
  var MAP_IMAGE = DELIVER_MAP.querySelector('.deliver__store-map-img');
  var DELIVERY_STORE_ITEM = DELIVERY_STORE_LIST.querySelectorAll('.input-btn__input');

  DELIVERY_STORE_ITEM.forEach(function (element) {
    element.addEventListener('click', function (evt) {
      evt.stopPropagation();
      element.style.cursor = 'pointer';
      for (var i = 0; i < mapPlace.length; i++) {
        if (evt.target.value === mapPlace[i]) {
          MAP_IMAGE.src = 'img/map/' + mapPlace[i] + '.jpg';
        }
      }
    });
  });
})();
