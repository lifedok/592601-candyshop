'use strict';

(function () {
  var MAX_PRICE = 300;
  var RANGE_FILTER = document.querySelector('.range__filter');
  var BTN_RANGE = RANGE_FILTER.querySelector('.range__btn');
  var BTN_LEFT = RANGE_FILTER.querySelector('.range__btn--left');
  var BTN_RIGHT = RANGE_FILTER.querySelector('.range__btn--right');
  var RANGE_FILL_LINE = RANGE_FILTER.querySelector('.range__fill-line');

  var RANGE_PRICES = document.querySelector('.range__prices');
  var PRICE_MIN = RANGE_PRICES.querySelector('.range__price--min');
  var PRICE_MAX = RANGE_PRICES.querySelector('.range__price--max');

  BTN_LEFT.style.cursor = 'pointer';
  BTN_RIGHT.style.cursor = 'pointer';
  BTN_RANGE.style.zIndex = '1';
  var widthFilter = RANGE_FILTER.offsetWidth;

  var relationPrice = function (value) {
    return Math.round(value * MAX_PRICE / widthFilter);
  };

  // default price
  var positionLeftPin = BTN_LEFT.offsetLeft;
  PRICE_MIN.textContent = relationPrice(positionLeftPin);
  var positionRightPin = BTN_RIGHT.offsetLeft;
  PRICE_MAX.textContent = relationPrice(positionRightPin);

  BTN_LEFT.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordinateX = evt.clientX;
    var onMouseMoveBtnLeft = function (museEvt) {
      museEvt.preventDefault();
      var mouseCoordinateX = museEvt.clientX;
      var shiftCoordinateX = startCoordinateX - mouseCoordinateX;
      startCoordinateX = mouseCoordinateX;
      var shiftLeftBtn = BTN_LEFT.offsetLeft - shiftCoordinateX; // положение левого пина
      var currentPositionRightPin = BTN_RIGHT.offsetLeft; // текущее положение правого пина

      if (checkMousePosition(shiftLeftBtn) > currentPositionRightPin) {
        BTN_LEFT.style.left = currentPositionRightPin + 'px';
        RANGE_FILL_LINE.style.left = currentPositionRightPin + 'px';
      } else {
        BTN_LEFT.style.left = checkMousePosition(shiftLeftBtn) + 'px';
        RANGE_FILL_LINE.style.left = checkMousePosition(shiftLeftBtn) + 'px';
        PRICE_MIN.textContent = relationPrice(checkMousePosition(shiftLeftBtn));
      }
    };
    var onMouseUpBtnLeft = function (upEvt) {
      upEvt.preventDefault();
      RANGE_FILTER.removeEventListener('mousemove', onMouseMoveBtnLeft);
      RANGE_FILTER.removeEventListener('mouseup', onMouseUpBtnLeft);
    };
    RANGE_FILTER.addEventListener('mousemove', onMouseMoveBtnLeft);
    RANGE_FILTER.addEventListener('mouseup', onMouseUpBtnLeft);
  });

  BTN_RIGHT.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordinateX = evt.clientX;
    var onMouseMoveBtnRight = function (museEvt) {
      museEvt.preventDefault();
      var mouseCoordinateX = museEvt.clientX;
      var shiftCoordinateX = startCoordinateX - mouseCoordinateX;
      startCoordinateX = mouseCoordinateX;
      var shiftRightBtn = BTN_RIGHT.offsetLeft - shiftCoordinateX; // положение правого пина
      var currentPositionLeftPin = BTN_LEFT.offsetLeft; // текущее положение левого пина

      if (checkMousePosition(shiftRightBtn) < currentPositionLeftPin) {
        BTN_RIGHT.style.left = currentPositionLeftPin + 'px';
      } else {
        BTN_RIGHT.style.left = checkMousePosition(shiftRightBtn) + 'px';
        RANGE_FILL_LINE.style.right = widthFilter - checkMousePosition(shiftRightBtn) + 'px';
        PRICE_MAX.textContent = relationPrice(checkMousePosition(shiftRightBtn));
      }
    };

    var onMouseUpBtnRight = function (upEvt) {
      upEvt.preventDefault();
      RANGE_FILTER.removeEventListener('mousemove', onMouseMoveBtnRight);
      RANGE_FILTER.removeEventListener('mouseup', onMouseUpBtnRight);
    };
    RANGE_FILTER.addEventListener('mousemove', onMouseMoveBtnRight);
    RANGE_FILTER.addEventListener('mouseup', onMouseUpBtnRight);
  });
  var checkMousePosition = function (value) {
    if (value < 0) {
      value = 0;
    } else if (value > widthFilter) {
      value = widthFilter;
    }
    return value;
  };

  var FILTERS_FORM = document.querySelector('.catalog__sidebar-form');

  var TYPE_CATALOG_FILTER = FILTERS_FORM.querySelector('#catalog__filter-type');
  var CONSTITUENT_CATALOG_FILTER = FILTERS_FORM.querySelector('#catalog__filter-constituent');
  var FAVORITE_CATALOG_FILTER = FILTERS_FORM.querySelector('#catalog__filter-favorite');
  var RATING_CATALOG_FILTER = FILTERS_FORM.querySelector('#catalog__filter-rating');

  TYPE_CATALOG_FILTER.querySelectorAll('.input-btn');
  CONSTITUENT_CATALOG_FILTER.querySelectorAll('.input-btn');
  FAVORITE_CATALOG_FILTER.querySelectorAll('.input-btn');
  RATING_CATALOG_FILTER.querySelectorAll('.input-btn');


  // var FILTER_ICECREAM_COUNT = FILTERS_FORM.querySelector('#filter-icecream-count');
  // var FILTER_SODA_COUNT = FILTERS_FORM.querySelector('#filter-soda-count');
  // var FILTER_GUM_COUNT = FILTERS_FORM.querySelector('#filter-gum-count');
  // var FILTER_MARMALADE_COUNT = FILTERS_FORM.querySelector('#filter-marmalade-count');
  // var FILTER_MARSHMALLOWS_COUNT = FILTERS_FORM.querySelector('#filter-marshmallows-count');
  // var FILTER_SUGAR_FREE_COUNT = FILTERS_FORM.querySelector('#filter-sugar-free-count');
  // var FILTER_VEGETARIAN_COUNT = FILTERS_FORM.querySelector('#filter-vegetarian-count');
  // var FILTER_GLUTEN_FREE_COUNT = FILTERS_FORM.querySelector('#filter-gluten-free-count');
  // var FILTER_FAVORITE_COUNT = FILTERS_FORM.querySelector('#filter-favorite-count');
  // var FILTER_AVAILABILITY_COUNT = FILTERS_FORM.querySelector('#filter-availability-count');


  // var goods = window.catalog.goods;


  // var itemCount = function () {
  //   var count = 0;
  //   console.log('goods=index', goods);
  //
  //   for (var i = 0; i < goods.length; i++) {
  //     console.log('goods=index', i);
  //
  //   }
  // goods.forEach(function (item, index) {
  //
  //   if (index.kind === 'Мороженое') {
  //     count += 1;
  //     FILTER_ICECREAM_COUNT.textContent = count;
  //     console.log('FILTER_ICECREAM_COUNT', FILTER_ICECREAM_COUNT);
  //     console.log('count', count);
  //
  //   }
  // });
  // };
  // itemCount();


  // фильтра
  // console.log('FILTERS_FORM', FILTERS_FORM);

  var updateGoods = function (goods) {

    var filtersRules = {
      'icecream': 'Мороженое',
      'soda': 'Газировка',
      'gum': 'Жевательная резинка',
      'marmalade': 'Мармелад',
      'marshmallows': 'Зефир'
    };

    var filteredOffers = [];
    var CHECKBOX_FILTERS = FILTERS_FORM.querySelectorAll('input[type="checkbox"]:checked');
    // var RADIO_FILTERS = FILTERS_FORM.querySelectorAll('input[type="radio"]:checked');

    var filterByIceCream = function (el) {
      return goods.filter(function (goodsData) {
        // console.log('el.value', el.value, filtersRules[el.value], goodsData.kind, goodsData.kind === filtersRules[el.value]);
        return goodsData.kind === filtersRules[el.value];
      });
    };

    if (CHECKBOX_FILTERS !== null) {
      CHECKBOX_FILTERS.forEach(function (filter) {
        var filtred = filterByIceCream(filter);
        filtred.forEach(function (el) {
          filteredOffers.push(el);
        });
        // console.log('filteredOffers', filteredOffers);
      });
    } else {
      goods.forEach(function (el) {
        filteredOffers.push(el);
      });
    }


    window.catalog.renderGoods(filteredOffers.filter(function (item) {
      return true;
    }));
  };


  window.filters = {
    filtersForm: FILTERS_FORM,
    updateGoods: function (goods) {
      updateGoods(goods);
    }
  };
})();
