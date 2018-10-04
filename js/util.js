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

  window.declination = function (number, first, second, third) {
    var num = Math.abs(number);
    var string;
    num %= 10;
    if (num === 1) {
      string = ' ' + first;
    }
    if (num >= 2 && num <= 4) {
      string = ' ' + second;
    }
    num %= 100;
    if (num >= 5 && num <= 20) {
      string = ' ' + third;
    }
    return string;
  };
})();
