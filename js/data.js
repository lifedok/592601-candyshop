'use strict';

(function () {
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

  var amountsConst = {
    MIN: 0,
    MAX: 20
  };

  var price = {
    MIN: 100,
    MAX: 1500
  };

  var weight = {
    MIN: 30,
    MAX: 300
  };

  var rating = {
    value: {
      MIN: 1,
      MAX: 5
    },
    number: {
      MIN: 10,
      MAX: 900
    }
  };

  var nutritionFacts = {
    energy: {
      MIN: 70,
      MAX: 500
    },
    contents: [
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
    ]
  };

  var COUNT_VIEW_ITEM = 26; // Максимальное количество товаров на странице
  var goods = window.util.product.goods; // массив товаров

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

  // функция для создания массива и 26 сгенерированных объектов
  var randomListGoods = function () {
    for (var i = 0; i < COUNT_VIEW_ITEM; i++) {
      goods.push({
        id: i,
        name: getRandomElement(NAME),
        picture: getSrcUrl(getRandomElement(IMAGE)),
        amounts: getRandomValue(amountsConst.MIN, amountsConst.MAX),
        price: getRandomValue(price.MIN, price.MAX),
        weight: getRandomValue(weight.MIN, weight.MAX),
        rating: {
          value: getRandomValue(rating.value.MIN, rating.value.MAX),
          number: getRandomValue(rating.number.MIN, rating.number.MAX)
        },
        nutritionFacts: {
          sugar: getRandomBoolean(),
          energy: getRandomValue(nutritionFacts.energy.MIN, nutritionFacts.energy.MAX),
          contents: getRandomElement(nutritionFacts.contents)
        }
      });
    }
  };
  randomListGoods();
})();
