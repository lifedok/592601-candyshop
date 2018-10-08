'use strict';

(function () {
  var MODAL_ERROR = document.querySelector('.modal--error');
  var MODAL_SUCCESS = document.querySelector('.modal--success');
  var CLOSE_MODAL_ERROR = MODAL_ERROR.querySelector('.modal__close');
  var CLOSE_MODAL_SUCCESS = MODAL_SUCCESS.querySelector('.modal__close');
  CLOSE_MODAL_ERROR.style.cursor = 'pointer';
  CLOSE_MODAL_SUCCESS.style.cursor = 'pointer';

  var escKeycode = window.util.keycode.ESC_KEYCODE;
  var enterKeycode = window.util.keycode.ENTER_KEYCODE;

  var onCloseModalEscPress = function (evt) {
    if (evt.keyCode === escKeycode) {
      onCloseErrorModal();
      onCloseSuccessModal();
    }
  };

  var onCloseErrorModal = function () {
    MODAL_ERROR.classList.add('modal--hidden');
    document.removeEventListener('keydown', onCloseModalEscPress);
  };
  var onCloseSuccessModal = function () {
    MODAL_SUCCESS.classList.add('modal--hidden');
    document.removeEventListener('keydown', onCloseModalEscPress);
  };

  MODAL_ERROR.addEventListener('click', function () {
    onCloseErrorModal();
  });
  MODAL_SUCCESS.addEventListener('click', function () {
    onCloseSuccessModal();
  });

  MODAL_ERROR.addEventListener('keydown', function (evt) {
    if (evt.keyCode === enterKeycode) {
      onCloseErrorModal();
    }
  });
  MODAL_SUCCESS.addEventListener('keydown', function (evt) {
    if (evt.keyCode === enterKeycode) {
      onCloseSuccessModal();
    }
  });


  window.modals = {
    MODAL_ERROR: MODAL_ERROR,
    MODAL_SUCCESS: MODAL_SUCCESS,
    CLOSE_MODAL_ERROR: CLOSE_MODAL_ERROR,
    CLOSE_MODAL_SUCCESS: CLOSE_MODAL_SUCCESS,
    onCloseModalEscPress: onCloseModalEscPress
  };
})();
