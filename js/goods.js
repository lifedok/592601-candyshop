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
  var cons = 10;
  var value = Math.floor(Math.random() * cons);
  return value < cons / 2;
};

var COUNT_VIEW_ITEM = 26;
// var COUNT_BASCET_ITEM = 3;

// функция для создания массива и 26 сгенерированных объектов
var randomItem = function () {
  var arr = [];
  for (var i = 0; i < COUNT_VIEW_ITEM; i++) {
    arr.push({
      name: getRandomElement(NAME),
      picture: getSrcUrl(getRandomElement(IMAGE)),
      amount: getRandomValue(0, 20),
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
  return arr;
};


// var CARD_BASKET_TEMPLATE = document.querySelector('#cards-empty').content;
var CARD_TEMPLATE = document.querySelector('#card').content;
var CATALOG_CARDS = document.querySelector('.catalog__cards');
var CATALOG_LOAD = document.querySelector('.catalog__load');

var GOODS_CARDS = document.querySelector('.goods__cards');
var GOODS_CARD_EMPTY = document.querySelector('.goods__card-empty');


// удаляем класс catalog__cards--load и добавляем класс catalog__load
CATALOG_CARDS.classList.remove('catalog__cards--load');
CATALOG_LOAD.classList.add('visually-hidden');

// удаляем класс goods__cards--empty и
// скрываем блок goods__card-empty классом visually-hidden
GOODS_CARDS.classList.remove('goods__cards--empty');
GOODS_CARD_EMPTY.classList.add('visually-hidden');


// на основе данных и шаблона catalog__card создаём DOM-элемент с товарами
var renderItem = function (arr) {
  var catalogCard = CARD_TEMPLATE.querySelector('.catalog__card').cloneNode(true);
  var cardPrice = catalogCard.querySelector('.card__price');
  var starsRating = catalogCard.querySelector('.stars__rating');
  var starCount = catalogCard.querySelector('.star__count');
  var cardCharacteristic = catalogCard.querySelector('.card__characteristic');
  var cardCompositionList = catalogCard.querySelector('.card__composition-list');

  for (var i = 0; i < arr.length; i++) {
    var amount = arr[i].amount;
    var name = arr[i].name;
    var price = arr[i].price;
    var weight = arr[i].weight;
    var ratingValue = arr[i].rating.value;
    var ratingNumber = arr[i].rating.number;
    var nutritionFactsSugar = arr[i].nutritionFacts.sugar;
    var nutritionFactsContents = arr[i].nutritionFacts.contents;

    // добавляем дополнительный класс в зависимости от amount
    if (amount > 5) {
      return catalogCard.classList.add('card--in-stock');
    } else if (amount > 1 && amount < 5) {
      return catalogCard.classList.add('card--title');
    } else if (amount === 0) {
      return catalogCard.classList.add('card--soon');
    }

    // добавляем название, цену и вес
    catalogCard.querySelector('.card__title').textContent = name;
    cardPrice.textContent = price;
    cardPrice.querySelector('.card__weight').textContent = weight;
    starCount.textContent = ratingNumber;

    // устанавливаем рейтинг в зависимости от rating.value
    switch (ratingValue) {
      case 1:
        starsRating.classList.add('stars__rating--one');
        break;
      case 2:
        starsRating.classList.add('stars__rating--two');
        break;
      case 3:
        starsRating.classList.add('stars__rating--three');
        break;
      case 4:
        starsRating.classList.add('stars__rating--four');
        break;
      case 5:
        starsRating.classList.add('stars__rating--five');
        break;
    }

    cardCharacteristic.textContent = nutritionFactsSugar === true ? 'Содержит сахар' : 'Без сахара';
    cardCompositionList.textContent = nutritionFactsContents;
  }
  return catalogCard;
};

// отрисовка сгенерированного DOM-элемента в блок .catalog__load
var getItemList = function () {
  var items = randomItem();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(renderItem(items[i]));
  }
  CATALOG_CARDS.appendChild(fragment);
};
getItemList();

// отрисовка basket DOM-элемента в блок .goods__cards
// var getItemsForBasket = function (arr, value) {
//   arr = [];
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < arr.length; i++) {
//     fragment.appendChild(renderItem(items[i]));
//   }
//   CATALOG_CARDS.appendChild(fragment);
// };


// console.log('GOODS_CARDS', GOODS_CARDS);
// console.log('CATALOG_CARDS', CATALOG_CARDS);
// console.log('CATALOG_LOAD', CATALOG_LOAD);
// console.log('CARD_ORDER_TEMPLATE', CARD_TEMPLATE);
// console.log('catalogCard', CARD_TEMPLATE.querySelector('.catalog__card').cloneNode(true));


