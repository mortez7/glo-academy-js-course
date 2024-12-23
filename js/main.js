"use strict";

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  rollback: 5,
  adaptive: true,
  services: [],
  servicePercentPrice: 0,
  allServicePrices: 0,
  fullPrice: 0,

  isNumber: function (num) {
    if (num === null) {
      return 0;
    }

    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  isString: function (str) {
    return typeof str === "string" && /[^\d]/.test(str);
  },

  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        "Калькулятор верстки"
      );
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!appData.isString(name));

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    appData.screenPrice = Number(appData.screenPrice);

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

    for (let i = 0; i < 2; i++) {
      let price;
      let name = "";
      do {
        name = prompt("Какой допольнительный тип услуги нужен?");
      } while (!appData.isString(name));

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      appData.services.push({ id: i, name: name, price: price });
    }
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(
      (sum, screen) => (sum += +screen.price),
      0
    );

    appData.allServicePrices = appData.services.reduce(
      (sum, service) => (sum += +service.price),
      0
    );
  },

  getRollBackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price > 0) {
      return "Скидка не предусмотрена";
    } else if (price <= 0) {
      return "Что то пошло не так";
    }
  },

  getFullPrice: function (fullPrice, allServicePrices) {
    appData.fullPrice = fullPrice + allServicePrices;
  },

  getTitle: function (title) {
    title = title.trim();
    appData.title = title[0].toUpperCase() + title.slice(1).toLowerCase();
  },

  getServicePercentPrice: function (fullPrice, rollback) {
    appData.servicePercentPrice = Math.ceil(
      fullPrice - fullPrice * (rollback / 100)
    );
  },

  start: function () {
    appData.asking();

    appData.addPrices();

    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);

    appData.getTitle(appData.title);

    appData.getServicePercentPrice(appData.fullPrice, appData.rollback);

    appData.logger();
  },

  logger: function () {
    console.log("allServicePrices", appData.allServicePrices);
    console.log(appData.screens);
    console.log(appData.getRollBackMessage(appData.fullPrice));
    console.log(
      "Стоимость работы за вычетом процента отката посреднику: " +
        appData.servicePercentPrice +
        " рублей"
    );
  },
};

appData.start();
