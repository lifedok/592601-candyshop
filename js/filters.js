'use strict';

(function () {
  var MAX_PRICE = 300;
  var MIN_PRICE = 0;
  var RANGE_FILTER = document.querySelector('.range__filter');
  var BTN_RANGE = RANGE_FILTER.querySelector('.range__btn');
  var BTN_LEFT = RANGE_FILTER.querySelector('.range__btn--left');
  var BTN_RIGHT = RANGE_FILTER.querySelector('.range__btn--right');
  var RANGE_FILL_LINE = RANGE_FILTER.querySelector('.range__fill-line');

  var RANGE_PRICES = document.querySelector('.range__prices');
  var PRICE_MIN = RANGE_PRICES.querySelector('.range__price--min');
  var PRICE_MAX = RANGE_PRICES.querySelector('.range__price--max');
  var WIDTH_BTN = BTN_RANGE.offsetWidth;

  BTN_LEFT.style.cursor = 'pointer';
  BTN_LEFT.style.left = 0;
  BTN_RIGHT.style.cursor = 'pointer';
  BTN_RIGHT.style.right = -WIDTH_BTN + 'px';
  BTN_RANGE.style.zIndex = '1';
  RANGE_FILL_LINE.style.left = 0;
  RANGE_FILL_LINE.style.right = 0;
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
    // console.log('BTN_LEFTevt');
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
  var SHOW_ALL = document.querySelector('.catalog__submit');


  // var CATALOG_CARDS = document.querySelector('.catalog__cards');

  var updateGoods = function (goods) {

    var filtersRules = {
      'icecream': 'Мороженое',
      'soda': 'Газировка',
      'gum': 'Жевательная резинка',
      'marmalade': 'Мармелад',
      'marshmallows': 'Зефир'
    };

    var filteredType = [];
    var CHECKBOX_TYPE_FILTERS = TYPE_CATALOG_FILTER.querySelectorAll('input[type="checkbox"]:checked');

    var filterByType = function (filter) {
      return goods.filter(function (goodsData) {
        return goodsData.kind === filtersRules[filter.value];
      });
    };

    if (CHECKBOX_TYPE_FILTERS.length > 0) {
      CHECKBOX_TYPE_FILTERS.forEach(function (filter) {
        var filtred = filterByType(filter);
        filtred.forEach(function (el) {
          filteredType.push(el);
        });
      });
    } else {
      goods.forEach(function (el) {
        filteredType.push(el);
      });
    }

    // фильтрация по составу
    var filteredConstituents = [];
    var isFilterByConstituent = function (goodsData, filterNodeList) {
      var filters = [];
      filterNodeList.forEach(function (filterNode) {
        filters.push(filterNode.value);
      });
      return filters.filter(function (filter) {
        if (filter === 'sugar-free') {
          return goodsData.nutritionFacts.sugar === false;
        } else if (filter === 'vegetarian') {
          return goodsData.nutritionFacts.vegetarian === true;
        } else if (filter === 'gluten-free') {
          return goodsData.nutritionFacts.gluten === false;
        }
        return false;
      }).length > 0;
    };

    var CHECKBOX_CONSTITUENT_FILTER = CONSTITUENT_CATALOG_FILTER.querySelectorAll('input[type="checkbox"]:checked');
    if (CHECKBOX_CONSTITUENT_FILTER.length > 0) {
      filteredConstituents = filteredType.filter(function (goodsData) {
        return isFilterByConstituent(goodsData, CHECKBOX_CONSTITUENT_FILTER);
      });
    } else {
      filteredType.forEach(function (el) {
        filteredConstituents.push(el);
      });
    }

    // фильтрация по рейтингу
    var filteredFavorite = [];
    var isFilterByFavorite = function (goodsData, filterNodeList) {
      var filters = [];
      filterNodeList.forEach(function (filterNode) {
        filters.push(filterNode.value);
      });
      return filters.filter(function (filter) {
        var result;
        if (filter === 'favorite') {
          result = goodsData.isFavorite;
        } else if (filter === 'availability') {
          result = goodsData.amount > 0;
        }
        return result;
      }).length > 0;
    };


    var CHECKBOX_FAVORITE_FILTER = FAVORITE_CATALOG_FILTER.querySelectorAll('input[type="checkbox"]:checked');
    if (CHECKBOX_FAVORITE_FILTER.length > 0) {
      filteredFavorite = filteredConstituents.filter(function (goodsData) {
        return isFilterByFavorite(goodsData, CHECKBOX_FAVORITE_FILTER);
      });
    } else {
      filteredConstituents.forEach(function (el) {
        filteredFavorite.push(el);
      });
    }

    // console.log('PRICE_MIN', PRICE_MIN, PRICE_MAX);
    // console.log('PRICE_MIN', MIN_PRICE, MAX_PRICE);


    var RADIO_FILTER = RATING_CATALOG_FILTER.querySelector('input[type="radio"]:checked');
    window.catalog.renderGoods(filteredFavorite.filter(function (item) {
      return item.price >= parseInt(PRICE_MIN.innerHTML, 10) && item.price <= parseInt(PRICE_MAX.innerHTML, 10);
    }).sort(function (item1, item2) {
      switch (RADIO_FILTER.value) {
        case 'popular':
          return item2.rating.number - item1.rating.number;
        case 'expensive':
          return item2.price - item1.price;
        case 'cheep':
          return item1.price - item2.price;
        case 'rating':
          if (item2.rating.value === item1.rating.value) {
            return item2.rating.number - item1.rating.number;
          }
          return item2.rating.value - item1.rating.value;
        default:
          return -1;
      }
    }));

    SHOW_ALL.addEventListener('click', (function () {
      return window.catalog.renderGoods;
    }));
  };


  window.filters = {
    filtersForm: FILTERS_FORM,
    updateGoods: function (goods) {
      updateGoods(goods);
    },
    price: {
      min: MIN_PRICE,
      max: MAX_PRICE
    }
  };
})();
