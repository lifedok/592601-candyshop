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


  var CATALOG_CARDS = document.querySelector('.catalog__cards');

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
        // console.log('el.value', filter.value, filtersRules[filter.value], goodsData.kind, goodsData.kind === filtersRules[filter.value]);
        return goodsData.kind === filtersRules[filter.value];
      });
    };

    if (CHECKBOX_TYPE_FILTERS !== null) {
      CHECKBOX_TYPE_FILTERS.forEach(function (filter) {
        var filtred = filterByType(filter);
        filtred.forEach(function (el) {
          filteredType.push(el);
        });
        // console.log('filteredOffers', filteredType);
      });
    } else if (CHECKBOX_TYPE_FILTERS === null) {
      goods.forEach(function (el) {
        filteredType.push(el);
      });
    }

    // фильтрация по составу
    var filteredConstituents = [];
    var CHECKBOX_CONSTITUENT_FILTER = CONSTITUENT_CATALOG_FILTER.querySelectorAll('input[type="checkbox"]:checked');
    var filterByConstituent = function (filter) {
      return filteredType.filter(function (goodsData) {
        var result;
        if (filter.value === 'sugar-free') {
          result = goodsData.nutritionFacts.sugar === false;
        } else if (filter.value === 'vegetarian') {
          result = goodsData.nutritionFacts.vegetarian === true;
        } else if (filter.value === 'gluten-free') {
          result = goodsData.nutritionFacts.gluten === false;
        }
        return result;
      });
    };

    if (CHECKBOX_CONSTITUENT_FILTER !== null) {
      CHECKBOX_CONSTITUENT_FILTER.forEach(function (filter) {
        // console.log('filter', filter);
        var filtred = filterByConstituent(filter);
        filtred.forEach(function (el) {
          filteredConstituents.push(el);
        });
        // console.log('filteredOffers', filteredConstituents);
      });
    } else if (CONSTITUENT_CATALOG_FILTER === null) {
      filteredType.forEach(function (el) {
        filteredConstituents.push(el);
      });
    }


    // фильтрация по рейтингу
    var filteredFavorite = [];
    var CHECKBOX_FAVORITE_FILTER = FAVORITE_CATALOG_FILTER.querySelectorAll('input[type="checkbox"]:checked');
    var filterByFavorite = function (filter) {
      return goods.filter(function (goodsData) {
        var result;
        if (filter.value === 'favorite') {
          result = CATALOG_CARDS.querySelectorAll('.card__btn-favorite--selected');
        } else if (filter.value === 'availability') {
          result = goodsData.amount > 0;
        }
        return result;
      });
    };

    if (CHECKBOX_FAVORITE_FILTER !== null) {
      CHECKBOX_FAVORITE_FILTER.forEach(function (filter) {
        // console.log('filter', filter);
        var filtred = filterByFavorite(filter);
        filtred.forEach(function (el) {
          filteredFavorite.push(el);
        });
        // console.log('filteredFavorite', filteredFavorite);
      });
    } else if (CHECKBOX_FAVORITE_FILTER === null) {
      goods.forEach(function (el) {
        filteredFavorite.push(el);
      });
    }

    var RADIO_FILTERS = RATING_CATALOG_FILTER.querySelectorAll('input[type="radio"]:checked');

    window.catalog.renderGoods(filteredType.filter(function (item) {
      // console.log('item', item);
      var result;
      RADIO_FILTERS.forEach(function (filter) {
        // console.log('filter', filter);
        switch (filter.value) {
          case 'popular':
            result = item.rating.number;
            break;
          case 'expensive':
            result = item.rating.number;
            break;
          case 'cheep':
            result = item.rating.number;
            break;
          case 'rating':
            result = item.rating.number;
            break;
        }
        // if (filter.value === 'popular') {
        //   result = item.rating.number; // вывести в порядке убывания популярности
        // } else if (filter.value === 'expensive') {
        //   result = item.price; // вывести в порядке убывания цены (сначало дорогие)
        // } else if (filter.value === 'cheep') {
        //   result = item.price; // вывести в порядке возростания цены (сначало дешёвые)
        // } else if (filter.value === 'rating') {
        //   result = item.rating.number; // вывести в порядке убывания рейтинга, если рейтинг совпадает, то учитывается популяроность
        // }
      });

      return result;
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
