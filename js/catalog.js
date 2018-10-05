'use strict';

(function () {
  var basketGoods = window.util.product.basketGoods; // массив товаров
  var goods = window.util.product.goods; // массив товаров
  var IMAGE_PATH = 'img/cards/';

  // Дополнительные поля для элементов в корзине
  var basketExtraValue = function () {
    var extraValue = {
      selected: 0,
      price: 0
    };
    for (var i = 0; i < basketGoods.length; i++) {
      extraValue.selected += basketGoods[i].selected;
      extraValue.price += basketGoods[i].price * basketGoods[i].selected;
    }
    return extraValue;
  };


  var CARD_TEMPLATE = document.querySelector('#card').content;
  var CATALOG_CARDS = document.querySelector('.catalog__cards');
  var CATALOG_LOAD = document.querySelector('.catalog__load');
  var CATALOG_CARD = CARD_TEMPLATE.querySelector('.catalog__card');

  // удаляем класс catalog__cards--load и добавляем класс catalog__load
  CATALOG_CARDS.classList.remove('catalog__cards--load');
  CATALOG_LOAD.classList.add('visually-hidden');

  // Обновление записи шапке корзины
  var changeHeaderForSelectedBasket = function () {
    var HEADER_BASKET = document.querySelector('.main-header__basket');
    var selectBasket = basketExtraValue();

    if (selectBasket.selected > 0) {
      HEADER_BASKET.innerHTML = 'В корзине '
      + selectBasket.selected
      + window.util.declination(selectBasket.selected, 'товар', 'товара', 'товаров')
      + ' на сумму ' + selectBasket.price + ' ₽';
    } else {
      HEADER_BASKET.innerHTML = 'В корзине ничего нет';
      BASKET_GOODS_CARDS.innerHTML = window.util.cardEmpty;
      basketGoods = [];
    }
  };

  // Отрисовывание в DOM массива списка товаров основываясь на template
  var renderItem = function (item) {
    var amounts = item.amount;
    var name = item.name;
    var nutritionFacts = {
      contents: item.nutritionFacts.contents,
      energy: item.nutritionFacts.energy,
      gluten: item.nutritionFacts.gluten,
      sugar: item.nutritionFacts.sugar,
      vegetarian: item.nutritionFacts.vegetarian
    };
    var picture = IMAGE_PATH + item.picture;
    var rating = {
      number: item.rating.number,
      value: item.rating.value
    };

    var catalogCardTemplate = CATALOG_CARD.cloneNode(true);
    var cardPrice = catalogCardTemplate.querySelector('.card__price');
    var starsRating = catalogCardTemplate.querySelector('.stars__rating');
    catalogCardTemplate.querySelector('.card__img').src = picture;
    catalogCardTemplate.querySelector('.star__count').textContent = rating.number;
    catalogCardTemplate.querySelector('.card__title').textContent = name;
    catalogCardTemplate.querySelector('.card__characteristic').textContent = nutritionFacts.sugar === true ? 'Содержит сахар' : 'Без сахара';
    catalogCardTemplate.querySelector('.card__composition-list').textContent = nutritionFacts.contents;
    cardPrice.innerHTML = item.price +
    '<span class="card__currency"> ₽</span>' +
    '<span class="card__weight">/' + item.weight + ' Г</span>';

    // устанавливаем рейтинг в зависимости от rating.value
    var starsClass = function (string) {
      starsRating.classList.remove('stars__rating--five');
      return starsRating.classList.add('stars__rating--' + string);
    };
    switch (rating.value) {
      case 1:
        starsClass('one');
        break;
      case 2:
        starsClass('two');
        break;
      case 3:
        starsClass('three');
        break;
      case 4:
        starsClass('four');
        break;
      case 5:
        starsClass('five');
        break;
    }

    if (amounts > 5) {
      catalogCardTemplate.classList.add('card--in-stock');
    } else if (amounts > 1 && amounts <= 5) {
      catalogCardTemplate.classList.add('card--title');
    } else if (amounts === 0) {
      catalogCardTemplate.classList.add('card--soon');
    }


    // Добавление выбранного товара в избранное
    var btnFavorite = catalogCardTemplate.querySelector('.card__btn-favorite');
    btnFavorite.addEventListener('click', function (evt) {
      evt.preventDefault();
      btnFavorite.classList.toggle('card__btn-favorite--selected');
    });

    // Переключатель отображения состава
    var cardMain = catalogCardTemplate.querySelector('.card__main');
    cardMain.querySelector('.card__btn-composition').style.cursor = 'pointer';
    cardMain.querySelector('.card__btn-composition').addEventListener('click', function (evt) {
      evt.preventDefault();
      cardMain.querySelector('.card__composition').classList.toggle('card__composition--hidden');
    });

    // копирование элемента из полного списка товаров в корзину.
    var addToBasket = catalogCardTemplate.querySelector('.card__btn');
    addToBasket.addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var itemId = item.name + item.price;
      var addToCard = false;

      for (var i = 0; i < basketGoods.length; i++) {
        var id = basketGoods[i].name + basketGoods[i].price;
        if (id === itemId) {
          addToCard = true;
          break;
        }
      }

      if (!addToCard) {
        basketGoods.push({
          id: itemId,
          name: item.name,
          allInStock: item.amount,
          selected: 1,
          price: item.price
        });
      } else if (addToCard) {
        if (basketGoods[i].selected < basketGoods[i].allInStock) {
          basketGoods[i].selected += 1;
          goods[i].amount -= 1;
          if (basketGoods[i].selected === basketGoods[i].allInStock) {
            disabledItem(itemId);
          }
        } else {
          disabledItem(itemId);
        }
      }

      renderBasketList();
    });

    return catalogCardTemplate;
  };


  var disabledItem = function (id) {
    document.querySelectorAll('.catalog__card').forEach(function (item, index) {
      if (index === id) {
        var cardBtn = item.querySelector('.card__btn');
        cardBtn.style.background = '#e8e8e8';
        cardBtn.style.cursor = 'default';
      }
    });
  };

  var CARD_BASKET_TEMPLATE = document.querySelector('#card-order').content;
  var BASKET_GOODS_CARDS = document.querySelector('.goods__cards');

  var successHandler = function (goodsList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < goodsList.length; i++) {
      goods.push(goodsList[i]);
      fragment.appendChild(renderItem(goodsList[i]));
    }
    CATALOG_CARDS.appendChild(fragment);
  };

  var errorHandler = function () {
    window.modals.MODAL_ERROR.classList.remove('modal--hidden');
    document.body.insertAdjacentElement('afterbegin');
  };
  window.backend.load(successHandler, errorHandler);


  var onHiddenEmptyBlock = function () {
    BASKET_GOODS_CARDS.innerHTML = '';
  };
  var renderBasketList = function () {
    onHiddenEmptyBlock();
    for (var i = 0; i < basketGoods.length; i++) {
      renderBasketItem(basketGoods[i]);
    }

    changeHeaderForSelectedBasket();
  };


  // Увеличение количества товаров в корзине
  var increase = function () {
    BASKET_GOODS_CARDS.addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var target = evt.target.closest('.card-order__btn--increase');
      var value = evt.target.closest('.card-order__amount').querySelector('.card-order__count');

      if (target === null) {
        return;
      }
      value.value++;
    });
  };
  increase();

  // Уменьшение количества товаров в корзине
  var decrease = function () {
    BASKET_GOODS_CARDS.addEventListener('click', function (evt) {
      var target = evt.target.closest('.card-order__btn--decrease');
      var value = evt.target.closest('.card-order__amount').querySelector('.card-order__count');

      if (target === null) {
        return;
      } else if (value.value > 1) {
        value.value--;
      } else {
        var targetCard = evt.target.closest('.card-order');
        BASKET_GOODS_CARDS.removeChild(targetCard);
      }
    });
  };
  decrease();

  // отрисовка элемента корзины
  var renderBasketItem = function (item) {
    var catalogBasketCard = CARD_BASKET_TEMPLATE.cloneNode(true);
    var closeButton = catalogBasketCard.querySelector('.card-order__close');

    var index = null;
    for (var i = 0; i < goods.length; i++) {
      if (goods[i].name + goods[i].price === item.id) {
        index = i;
        break;
      }
    }

    catalogBasketCard.querySelector('.card-order__title').textContent = goods[index].name;
    catalogBasketCard.querySelector('.card-order__img').src = IMAGE_PATH + goods[index].picture;
    catalogBasketCard.querySelector('.card-order__price').textContent = goods[index].price;
    catalogBasketCard.querySelector('.card-order__count').value = item.selected;


    closeButton.addEventListener('click', function () {
    // удалить элемент из массива basketGoods
      basketGoods.length = basketGoods.length - 1;
      if (basketGoods.length === 0) {
        BASKET_GOODS_CARDS.innerHTML = window.util.cardEmpty;
      }
    });

    var btnDecrease = catalogBasketCard.querySelector('.card-order__btn--decrease');
    var btnIncrease = catalogBasketCard.querySelector('.card-order__btn--increase');

    // Увеличение на один заказа в корзине
    btnIncrease.addEventListener('click', function () {
      basketGoods.forEach(function (itemElement) {
        if (itemElement.id === goods[index].name + goods[index].price) {
          if (itemElement.selected < itemElement.allInStock) {
            itemElement.selected += 1;
            changeHeaderForSelectedBasket();
          } else if (itemElement.selected === itemElement.allInStock) {
            changeHeaderForSelectedBasket();
          }
        }
      });
    });
    // Уменьшение на один заказа в корзине
    btnDecrease.addEventListener('click', function () {
      basketGoods.forEach(function (itemElement) {
        if (itemElement.id === goods[index].name + goods[index].price) {
          if (itemElement.selected < itemElement.allInStock) {
            itemElement.selected -= 1;
            changeHeaderForSelectedBasket();
          } else if (itemElement.selected === itemElement.allInStock) {
            changeHeaderForSelectedBasket();
            BASKET_GOODS_CARDS.innerHTML = window.util.cardEmpty;
          }
        }
      });
    });

    BASKET_GOODS_CARDS.appendChild(catalogBasketCard);
  };

  // удаление элемента из корзины
  BASKET_GOODS_CARDS.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var target = evt.target.closest('.card-order__close');
    if (target === null) {
      return;
    }

    var targetCard = evt.target.closest('.card-order');
    BASKET_GOODS_CARDS.removeChild(targetCard);
    changeHeaderForSelectedBasket();
  });
})();
