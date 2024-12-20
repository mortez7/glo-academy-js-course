"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  rollback: 5,
  adaptive: true,
  service1: "",
  service2: "",
  servicePercentPrice: 0,
  allServicePrices: 0,
  fullPrice: 0,

  isNumber: function (num) {
    if (num === null) {
      return 0;
    }

    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные"
    );

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));

    appData.screenPrice = Number(appData.screenPrice);

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
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

  getAllServicePrices: function () {
    let sum = 0;
    let servicePrice;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt(
          "Какой допольнительный тип услуги нужен?",
          "Отправка форм в телеграм"
        );
      } else if (i === 1) {
        appData.service2 = prompt(
          "Какой допольнительный тип услуги нужен?",
          "Метрика"
        );
      }
      do {
        servicePrice = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(servicePrice));

      sum += Number(servicePrice);
    }

    return sum;
  },

  getFullPrice: function (fullPrice, allServicePrices) {
    return fullPrice + allServicePrices;
  },

  getTitle: function (title) {
    title = title.trim();
    return title[0].toUpperCase() + title.slice(1).toLowerCase();
  },

  getServicePercentPrice: function (fullPrice, rollback) {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
  },

  start: function () {
    appData.asking();

    appData.allServicePrices = appData.getAllServicePrices();

    appData.fullPrice = appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrices
    );

    appData.title = appData.getTitle(appData.title);

    appData.servicePercentPrice = appData.getServicePercentPrice(
      appData.fullPrice,
      appData.rollback
    );

    appData.logger();
  },

  logger: function () {
    console.log("allServicePrices", appData.allServicePrices);
    console.log("Типы экранов для разработки: " + appData.screens);
    console.log(appData.getRollBackMessage(appData.fullPrice));
    console.log(
      "Стоимость работы за вычетом процента отката посреднику: " +
        appData.servicePercentPrice +
        " рублей"
    );
  },
};

appData.start();
