'use strict';

(function () {
  var goods = []; // массив товаров
  var basketGoods = []; // массив товаров в корзине

  var PAYMENT = document.querySelector('.payment');
  var PAYMENT_CARD_BLOCK = PAYMENT.querySelector('.payment__card-wrap');

  window.util = {
    product: {
      goods: goods,
      basketGoods: basketGoods
    },
    tabs: {
      PAYMENT: PAYMENT,
      PAYMENT_CARD_BLOCK: PAYMENT_CARD_BLOCK
    }
  };
})();
