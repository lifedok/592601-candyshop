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
})();
