'use strict';

(function () {
  var MODAL_ERROR = document.querySelector('.modal--error');
  var MODAL_SUCCESS = document.querySelector('.modal--success');
  var CLOSE_MODAL_ERROR = MODAL_ERROR.querySelector('.modal__close');
  var CLOSE_MODAL_SUCCESS = MODAL_SUCCESS.querySelector('.modal__close');
  CLOSE_MODAL_ERROR.style.cursor = 'pointer';
  CLOSE_MODAL_SUCCESS.style.cursor = 'pointer';

  var escKeycode = window.escKeycode;

  var onCloseErrorModal = function (evt) {
    if (evt.keyCode === escKeycode || evt.target.className === CLOSE_MODAL_ERROR) {
      MODAL_ERROR.classList.add('modal--hidden');
      document.removeEventListener('keydown', onCloseErrorModal);
    }
  };

  var onCloseSuccessModal = function (evt) {
    if (evt.keyCode === escKeycode || evt.target.className === CLOSE_MODAL_SUCCESS) {
      MODAL_SUCCESS.classList.add('modal--hidden');
      document.removeEventListener('keydown', onCloseSuccessModal);
    }
  };
  window.modals = {
    MODAL_ERROR: MODAL_ERROR,
    MODAL_SUCCESS: MODAL_SUCCESS,
    CLOSE_MODAL_ERROR: CLOSE_MODAL_ERROR,
    CLOSE_MODAL_SUCCESS: CLOSE_MODAL_SUCCESS
  };
})();
