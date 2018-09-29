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
var goods = []; // массив товаров
var basketGoods = []; // массив товаров в корзине

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


// копирование объекта из списка товаров в корзину.
var changeHeaderForSelectedBasket = function () {
  var HEADER_BASKET = document.querySelector('.main-header__basket');
  var selectBasket = basketExtraValue();

  if (selectBasket.selected > 0) {
    HEADER_BASKET.innerHTML = 'В корзине ' + selectBasket.selected + declination(selectBasket.selected) + ' на сумму ' + selectBasket.price + ' ₽';
  } else {
    HEADER_BASKET.innerHTML = 'В корзине ничего нет';
  }
};

var renderItem = function (item) {
  var amounts = item.amounts;
  var name = item.name;
  var picture = item.picture;
  var ratingValue = item.rating.value;
  var ratingNumber = item.rating.number;
  var nutritionFactsSugar = item.nutritionFacts.sugar;
  var nutritionFactsContents = item.nutritionFacts.contents;

  var catalogCardTemplate = CATALOG_CARD.cloneNode(true);
  var cardPrice = catalogCardTemplate.querySelector('.card__price');
  var starsRating = catalogCardTemplate.querySelector('.stars__rating');
  catalogCardTemplate.querySelector('.card__img').src = picture;
  catalogCardTemplate.querySelector('.star__count').textContent = ratingNumber;
  catalogCardTemplate.querySelector('.card__title').textContent = name;
  catalogCardTemplate.querySelector('.card__characteristic').textContent = nutritionFactsSugar === true ? 'Содержит сахар' : 'Без сахара';
  catalogCardTemplate.querySelector('.card__composition-list').textContent = nutritionFactsContents;
  cardPrice.innerHTML = item.price +
    '<span class="card__currency"> ₽</span>' +
    '<span class="card__weight">/' + item.weight + ' Г</span>';

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

  var addToBasket = catalogCardTemplate.querySelector('.card__btn');
  addToBasket.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var itemId = item.id;
    var addToCard = false;

    for (var i = 0; i < basketGoods.length; i++) {
      if (basketGoods[i].id === itemId) {
        console.log('basketGoods true', basketGoods[i].id, itemId);

        addToCard = true;
        break;
      }
    }

    if (!addToCard || basketGoods[i].selected < 1) {
      console.log('basketGoods ==== true', basketGoods);

      basketGoods.push({
        id: itemId,
        allInStock: item.amounts,
        selected: 1,
        price: item.price
      });
    } else {
      console.log('basketGoods', basketGoods);

      if (basketGoods[i].selected < basketGoods[i].allInStock) {
        basketGoods[i].selected += 1;
      } else if (basketGoods[i].selected === basketGoods[i].allInStock) {
        console.log('item', item);
        console.log('basketGoods', basketGoods);
        console.log('goods', goods);
        disabledItem(itemId);
      } else {
        console.log('item', item);
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


console.log('goods', goods);
console.log('basketGoods', basketGoods);

var getItemList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < goods.length; i++) {
    fragment.appendChild(renderItem(goods[i]));
  }
  CATALOG_CARDS.appendChild(fragment);
};
getItemList();

var onHiddenEmptyBlock = function () {
  BASKET_GOODS_CARDS.classList.remove('goods__cards--empty');
  GOODS_CARD_EMPTY.classList.add('visually-hidden');
};
var renderBasketList = function () {
  onHiddenEmptyBlock();
  for (var i = 0; i < basketGoods.length; i++) {
    renderBasketItem(basketGoods[i]);
  }

  changeHeaderForSelectedBasket();
};

// ============== работа с корзиной ==================
var CARD_BASKET_TEMPLATE = document.querySelector('#card-order').content;

var BASKET_GOODS_CARDS = document.querySelector('.goods__cards');
var GOODS_CARD_EMPTY = document.querySelector('.goods__card-empty');

var declination = function (number) {
  var num = Math.abs(number);
  var string;
  num %= 100;
  if (num >= 5 && num <= 20) {
    string = ' товаров';
  }
  num %= 10;
  if (num === 1) {
    string = ' товар';
  }
  if (num >= 2 && num <= 4) {
    string = ' товара';
  }
  return string;
};

// отрисовка элемента корзины
var renderBasketItem = function (item) {
  var catalogBasketCard = CARD_BASKET_TEMPLATE.cloneNode(true);

  var index = null;
  for (var i = 0; i < goods.length; i++) {
    if (goods[i].id === item.id) {
      index = i;
      break;
    }
  }

  catalogBasketCard.querySelector('.card-order__title').textContent = goods[index].name;
  catalogBasketCard.querySelector('.card-order__img').src = goods[index].picture;
  catalogBasketCard.querySelector('.card-order__price').textContent = goods[index].price;
  catalogBasketCard.querySelector('.card-order__count').value = item.selected;


  BASKET_GOODS_CARDS.appendChild(catalogBasketCard);
};

// Переключатель отображения состава
document.querySelectorAll('.card__main').forEach(function (item) {
  item.querySelector('.card__btn-composition').addEventListener('click', function (evt) {
    evt.preventDefault();
    item.querySelector('.card__composition').classList.toggle('card__composition--hidden');
  });
});


// ПЕРЕКЛЮЧАТЕЛЬ ТАБОВ ДОСТАВКИ
// Привязаться к id таба
var DELIVERY_STORE = document.getElementById('deliver__store');
var DELIVERY_COURIER = document.getElementById('deliver__courier');
var DELIVERY_STORE_BLOCK = document.querySelector('.deliver__store');
var DELIVERY_COURIER_BLOCK = document.querySelector('.deliver__courier');

DELIVERY_STORE.checked = true;
DELIVERY_COURIER.checked = false;
DELIVERY_STORE.addEventListener('click', function () {
  DELIVERY_STORE_BLOCK.classList.remove('visually-hidden');
  DELIVERY_COURIER_BLOCK.classList.add('visually-hidden');
});

DELIVERY_COURIER.addEventListener('click', function () {
  DELIVERY_STORE_BLOCK.classList.add('visually-hidden');
  DELIVERY_COURIER_BLOCK.classList.remove('visually-hidden');
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
