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
var COUNT_BASKET_ITEM = 3;
var goods = [];
var basketGoods = [];

// функция для создания массива и 26 сгенерированных объектов
var randomItem = function () {
  for (var i = 0; i < COUNT_VIEW_ITEM; i++) {
    goods.push({
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

  var catalogCard = CARD_TEMPLATE.querySelector('.catalog__card').cloneNode(true);
  var cardPrice = catalogCard.querySelector('.card__price');
  var starsRating = catalogCard.querySelector('.stars__rating');
  catalogCard.querySelector('.card__img').src = picture;
  catalogCard.querySelector('.star__count').textContent = ratingNumber;
  catalogCard.querySelector('.card__title').textContent = name;
  catalogCard.querySelector('.card__characteristic').textContent = nutritionFactsSugar === true ? 'Содержит сахар' : 'Без сахара';
  catalogCard.querySelector('.card__composition-list').textContent = nutritionFactsContents;
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
    catalogCard.classList.add('card--in-stock');
  } else if (amount > 1 && amount < 5) {
    catalogCard.classList.add('card--title');
  } else if (amount === 0) {
    catalogCard.classList.add('card--soon');
  }
  return catalogCard;
};

var getItemList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < goods.length; i++) {
    fragment.appendChild(renderItem(goods[i]));
  }
  CATALOG_CARDS.appendChild(fragment);
};
getItemList();


var CARD_BASKET_TEMPLATE = document.querySelector('#card-order').content;
var GOODS_CARDS = document.querySelector('.goods__cards');
var GOODS_CARD_EMPTY = document.querySelector('.goods__card-empty');
GOODS_CARDS.classList.remove('goods__cards--empty');
GOODS_CARD_EMPTY.classList.add('visually-hidden');

// добавление в корзину
var getBasketItems = function () {
  var startIndex = getRandomValue(0, goods.length - COUNT_BASKET_ITEM - 1);
  basketGoods = goods.slice(startIndex, startIndex + COUNT_BASKET_ITEM);
};
getBasketItems();

var renderBasketItem = function (arr) {
  var name = arr.name;
  var picture = arr.picture;
  var price = arr.price;
  var amount = arr.amounts;

  var catalogBasketCard = CARD_BASKET_TEMPLATE.querySelector('.goods_card').cloneNode(true);
  catalogBasketCard.querySelector('.card-order__title').textContent = name;
  catalogBasketCard.querySelector('.card-order__img').src = picture;
  catalogBasketCard.querySelector('.card-order__price').textContent = price;
  catalogBasketCard.querySelector('.card-order__count').value = amount;
  return catalogBasketCard;
};


var getBasketItemList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < basketGoods.length; i++) {
    fragment.appendChild(renderBasketItem(basketGoods[i]));
  }
  GOODS_CARDS.appendChild(fragment);
};
getBasketItemList();
