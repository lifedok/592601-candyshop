'use strict';

var IMAGE = [
  'gum-cedar',
  'gum-chile',
  'gum-eggplant',
  'gum-mustard',
  'gum-portwine',
  'gum-wasabi',
  'ice-cucumber',
  'ice-eggplant',
  'ice-garlic',
  'ice-italian',
  'ice-mushroom',
  'ice-pig',
  'marmalade-beer',
  'marmalade-caviar',
  'marmalade-corn',
  'marmalade-new-year',
  'marmalade-sour',
  'marshmallow-bacon',
  'marshmallow-beer',
  'marshmallow-shrimp',
  'marshmallow-spicy',
  'marshmallow-wine',
  'soda-bacon',
  'soda-celery',
  'soda-cob',
  'soda-garlic',
  'soda-peanut-grapes',
  'soda-russian'
];

var NAME = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];
var CONTENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];


// функция для нахождения рандомного числа в заданном диапозоне
var getRandomValue = function (minValue, maxValue) {
  var value = minValue - 0.5 + Math.random() * (maxValue - minValue + 1);
  return Math.round(value);
};

// функция для нахождения рандомного элемента из массива
var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var getSrcUrl = function (item) {
  return 'img/cards/' + item + '.jpg';
};

// функция для нахождения рандомного булевого значения
var getRandomBoolean = function () {
  return Math.random() <= 0.5;
};

var COUNT_VIEW_ITEM = 26;
var goods = [];
var basketGoods = [];

// функция для создания массива и 26 сгенерированных объектов
var randomItem = function () {
  for (var i = 0; i < COUNT_VIEW_ITEM; i++) {
    goods.push({
      id: i,
      countSelectItem: 0,
      name: getRandomElement(NAME),
      picture: getSrcUrl(getRandomElement(IMAGE)),
      amounts: getRandomValue(0, 20),
      price: getRandomValue(100, 1500),
      weight: getRandomValue(30, 300),
      rating: {
        value: getRandomValue(1, 5),
        number: getRandomValue(10, 900)
      },
      nutritionFacts: {
        sugar: getRandomBoolean(),
        energy: getRandomValue(70, 500),
        contents: getRandomElement(CONTENTS)
      }
    });
  }
};
randomItem();


var CARD_TEMPLATE = document.querySelector('#card').content;
var CATALOG_CARDS = document.querySelector('.catalog__cards');
var CATALOG_LOAD = document.querySelector('.catalog__load');
var CATALOG_CARD = CARD_TEMPLATE.querySelector('.catalog__card');

// удаляем класс catalog__cards--load и добавляем класс catalog__load
CATALOG_CARDS.classList.remove('catalog__cards--load');
CATALOG_LOAD.classList.add('visually-hidden');
// на основе данных и шаблона catalog__card создаём DOM-элемент с товарами
var renderItem = function (arr) {
  var amount = arr.amounts;
  var name = arr.name;
  var price = arr.price;
  var picture = arr.picture;
  var weight = arr.weight;
  var ratingValue = arr.rating.value;
  var ratingNumber = arr.rating.number;
  var nutritionFactsSugar = arr.nutritionFacts.sugar;
  var nutritionFactsContents = arr.nutritionFacts.contents;

  var catalogCardTemplate = CATALOG_CARD.cloneNode(true);
  var cardPrice = catalogCardTemplate.querySelector('.card__price');
  var starsRating = catalogCardTemplate.querySelector('.stars__rating');
  catalogCardTemplate.querySelector('.card__img').src = picture;
  catalogCardTemplate.querySelector('.star__count').textContent = ratingNumber;
  catalogCardTemplate.querySelector('.card__title').textContent = name;
  catalogCardTemplate.querySelector('.card__characteristic').textContent = nutritionFactsSugar === true ? 'Содержит сахар' : 'Без сахара';
  catalogCardTemplate.querySelector('.card__composition-list').textContent = nutritionFactsContents;
  cardPrice.innerHTML = price +
    '<span class="card__currency"> ₽</span>' +
    '<span class="card__weight">/' + weight + ' Г</span>';

  // устанавливаем рейтинг в зависимости от rating.value
  var starsClass = function (string) {
    starsRating.classList.remove('stars__rating--five');
    return starsRating.classList.add('stars__rating--' + string);
  };
  switch (ratingValue) {
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

  if (amount > 5) {
    catalogCardTemplate.classList.add('card--in-stock');
  } else if (amount > 1 && amount <= 5) {
    catalogCardTemplate.classList.add('card--title');
  } else if (amount === 0) {
    catalogCardTemplate.classList.add('card--soon');
  }
  return catalogCardTemplate;
};

// отрисовка товаров меню
var getItemList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < goods.length; i++) {
    fragment.appendChild(renderItem(goods[i]));
  }
  CATALOG_CARDS.appendChild(fragment);
};
getItemList();


// работа с корзиной
var CARD_BASKET_TEMPLATE = document.querySelector('#card-order').content;
var GOODS_CARDS = document.querySelector('.goods__cards');
var GOODS_CARD_EMPTY = document.querySelector('.goods__card-empty');

var onHiddenEmptyBlock = function () {
  GOODS_CARDS.classList.remove('goods__cards--empty');
  GOODS_CARD_EMPTY.classList.add('visually-hidden');
};

// отрисовка элемента корзины
var basketItem = function (arr) {
  var name = arr.name;
  var picture = arr.picture;
  var price = arr.price;
  var countItem = arr.countSelectItem;

  var catalogBasketCard = CARD_BASKET_TEMPLATE.querySelector('.goods_card').cloneNode(true);
  catalogBasketCard.querySelector('.card-order__title').textContent = name;
  catalogBasketCard.querySelector('.card-order__img').src = picture;
  catalogBasketCard.querySelector('.card-order__price').textContent = price;
  catalogBasketCard.querySelector('.card-order__count').value = countItem;
  return catalogBasketCard;
};

// отрисовка шаблона элемента корзины в DOM
var NEW_ID;
var getBasketItemList = function (id) {
  NEW_ID = id;
  // console.log('NEW_ID 1 ==>', NEW_ID, id);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < goods.length; i++) {
    if (i === id) {
      // console.log('NEW_ID 2 ==>', NEW_ID, id, i);
      getBasketItems(id);
      fragment.appendChild(basketItem(goods[i]));
    }
  }
  onHiddenEmptyBlock();
  GOODS_CARDS.appendChild(fragment);
};

// добавление объекта данных в корзину
var getBasketItems = function (id) {
  if (NEW_ID !== id) {
    NEW_ID = id;
    for (var i = 0; i < goods.length; i++) {
      if (goods[i].id === id && goods[i].countSelectItem === 1) {
        basketGoods.push({
          id: goods[i].id,
          name: goods[i].name,
          picture: goods[i].picture,
          price: goods[i].price,
          countItem: goods[i].countSelectItem
        });
      }
    }
  } else if (NEW_ID === id) {
    for (var a = 0; a < basketGoods.length; a++) {
      if (basketGoods[a].id === NEW_ID) {
        basketGoods[a].countItem += 1;
      }
    }
  }
};


// Добавление выбранного товара в избранное
document.querySelectorAll('.card__btn-favorite').forEach(function (item) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault();
    item.classList.toggle('card__btn-favorite--selected');
  });
});

// копирование объекта из списка товаров в корзину.
var HEADER_BASKET = document.querySelector('.main-header__basket');
var TOTAL_ITEM_BASKET = 0;
document.querySelectorAll('.card__btn').forEach(function (item, index) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    // console.log('goods', goods);
    // console.log('goods', basketGoods);

    if (goods[index].amounts !== 0) {
      goods[index].countSelectItem += 1;
      goods[index].amounts -= 1;
      getBasketItemList(index);
      // По клику на "добавить" изменяем значение в хедере возле корзины
      TOTAL_ITEM_BASKET += 1;
      HEADER_BASKET.innerText = TOTAL_ITEM_BASKET;
      if (goods[index].amounts === 0) {
        item.style.background = '#e8e8e8';
        item.style.cursor = 'default';
      }
    }
  });
});

// удаление из корзины - сделано, но не сортирует по одному типу
document.querySelectorAll('.card-order__close').forEach(function (item, index) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault();

    // console.log('basketGoods', basketGoods);
    // console.log('goods[index].amounts', basketGoods[index].amounts);
    if (basketGoods[index].amounts !== 0) {
      goods[index].countSelectItem -= 1;
      goods[index].amounts += 1;
      getBasketItemList(index);


      TOTAL_ITEM_BASKET -= 1;
      HEADER_BASKET.innerText = TOTAL_ITEM_BASKET;
      if (goods[index].amounts === 0) {
        item.style.background = '#ffdd21';
        item.style.cursor = 'pointer';
      }
    }
  });
});

// ПЕРЕКЛЮЧАТЕЛЬ ТАБОВ ДОСТАВКИ
// Привязаться к id таба
var DELIVERY_STORE = document.getElementById('deliver__store');
var DELIVERY_COURIER = document.getElementById('deliver__courier');
var DELIVERY_STORE_BLOCK = document.querySelector('.deliver__store');
var DELIVERY_COURIER_BLOCK = document.querySelector('.deliver__courier');

DELIVERY_STORE.checked = false;
DELIVERY_COURIER.checked = true;
DELIVERY_STORE.addEventListener('click', function () {
  DELIVERY_STORE_BLOCK.classList.add('visually-hidden');
  DELIVERY_COURIER_BLOCK.classList.remove('visually-hidden');
});

DELIVERY_COURIER.addEventListener('click', function () {
  DELIVERY_STORE_BLOCK.classList.remove('visually-hidden');
  DELIVERY_COURIER_BLOCK.classList.add('visually-hidden');
});

// ПЕРЕКЛЮЧАТЕЛЬ ТАБОВ ОПЛАТЫ
// Привязаться к id таба
var PAYMENT_CARD = document.getElementById('payment__card');
var PAYMENT_CASH = document.getElementById('payment__cash');
var PAYMENT_CARD_BLOCK = document.querySelector('.payment__card-wrap');
var PAYMENT_CASH_BLOCK = document.querySelector('.payment__cash-wrap');

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

// процесс перетаскивания, работа с фильтрами.
var MAX_PRICE = 300;
var RANGE_FILTER = document.querySelector('.range__filter');
var BTN_RANGE = RANGE_FILTER.querySelector('.range__btn');
var BTN_LEFT = RANGE_FILTER.querySelector('.range__btn--left');
var BTN_RIGHT = RANGE_FILTER.querySelector('.range__btn--right');
var RANGE_FILL_LINE = RANGE_FILTER.querySelector('.range__fill-line');

var RANGE_PRICES = document.querySelector('.range__prices');
var PRICE_MIN = RANGE_PRICES.querySelector('.range__price--min');
var PRICE_MAX = RANGE_PRICES.querySelector('.range__price--max');


var relationPositionX = function (number) {
  var widthFilter = RANGE_FILTER.offsetWidth;
  var widthBtn = BTN_RANGE.offsetWidth;
  var rangaFilterX1 = RANGE_FILTER.offsetLeft;
  var trackRight = widthFilter + widthBtn / 2;
  var shift = number - widthBtn / 2 - rangaFilterX1;
  var leftX;

  if (shift > 0 && shift < widthFilter) {
    leftX = shift / widthFilter * 100;
  } else if (shift < 0) {
    leftX = 0;
  } else if (shift < widthFilter) {
    leftX = parseInt(trackRight, 10);
  }
  return leftX;
};

var relationPrice = function (value) {
  return Math.round(value * MAX_PRICE / 100);
};


var newX;
BTN_LEFT.addEventListener('mouseup', function (evt) {
  evt.preventDefault();

  newX = evt.clientX;
  BTN_LEFT.style.left = relationPositionX(newX) + '%';
  RANGE_FILL_LINE.style.left = relationPositionX(newX) + '%';
  PRICE_MIN.textContent = relationPrice(relationPositionX(newX));

});
BTN_RIGHT.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  newX = evt.clientX;

  BTN_RIGHT.style.left = relationPositionX(newX) + '%';
  RANGE_FILL_LINE.style.right = (100 - relationPositionX(newX)) + '%';
  PRICE_MAX.textContent = relationPrice(relationPositionX(newX));
});
