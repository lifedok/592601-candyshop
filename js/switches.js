'use strict';

(function () {
// ПЕРЕКЛЮЧАТЕЛЬ ТАБОВ ДОСТАВКИ
// Привязаться к id таба
  var DELIVERY_STORE = document.getElementById('deliver__store');
  var DELIVERY_COURIER = document.getElementById('deliver__courier');
  var DELIVERY_STORE_BLOCK = document.querySelector('.deliver__store');
  var DELIVERY_COURIER_BLOCK = document.querySelector('.deliver__courier');

  DELIVERY_STORE.checked = true;
  DELIVERY_COURIER.checked = false;
  DELIVERY_STORE.addEventListener('click', function () {
    DELIVERY_STORE_BLOCK.classList.remove('visually-hidden');
    DELIVERY_COURIER_BLOCK.classList.add('visually-hidden');
  });

  DELIVERY_COURIER.addEventListener('click', function () {
    DELIVERY_STORE_BLOCK.classList.add('visually-hidden');
    DELIVERY_COURIER_BLOCK.classList.remove('visually-hidden');
  });


  // ПЕРЕКЛЮЧАТЕЛЬ ТАБОВ ОПЛАТЫ
  // Привязаться к id таба
  var PAYMENT = window.util.tabs.PAYMENT;
  var PAYMENT_CARD = PAYMENT.querySelector('#payment__card');
  var PAYMENT_CASH = PAYMENT.querySelector('#payment__cash');
  var PAYMENT_CARD_BLOCK = PAYMENT.querySelector('.payment__card-wrap');
  var PAYMENT_CASH_BLOCK = PAYMENT.querySelector('.payment__cash-wrap');

  PAYMENT_CARD.checked = true;
  PAYMENT_CASH.checked = false;
  PAYMENT_CASH.addEventListener('click', function () {
    PAYMENT_CARD_BLOCK.classList.add('visually-hidden');
    PAYMENT_CASH_BLOCK.classList.remove('visually-hidden');
  });

  PAYMENT_CARD.addEventListener('click', function () {
    PAYMENT_CARD_BLOCK.classList.remove('visually-hidden');
    PAYMENT_CASH_BLOCK.classList.add('visually-hidden');
  });

  // Переключатель отображения состава
  document.querySelectorAll('.card__main').forEach(function (item) {
    item.querySelector('.card__btn-composition').addEventListener('click', function (evt) {
      evt.preventDefault();
      item.querySelector('.card__composition').classList.toggle('card__composition--hidden');
    });
  });
})();
