"use strict";

let title;
let screens;
let screenPrice;
let rollback = 5;
let adaptive;
let service1;
let service2;
let servicePercentPrice;
let allServicePrices;
let fullPrice;

const isNumber = function (num) {
  if (num === null) {
    return 0;
  }

  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));

  screenPrice = Number(screenPrice);

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollBackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price > 0) {
    return "Скидка не предусмотрена";
  } else if (price <= 0) {
    return "Что то пошло не так";
  }
};

const getAllServicePrices = function () {
  let sum = 0;
  let servicePrice;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt(
        "Какой допольнительный тип услуги нужен?",
        "Отправка форм в телеграм"
      );
    } else if (i === 1) {
      service2 = prompt("Какой допольнительный тип услуги нужен?", "Метрика");
    }
    do {
      servicePrice = prompt("Сколько это будет стоить?");
    } while (!isNumber(servicePrice));

    sum += Number(servicePrice);
  }

  return sum;
};

function getFullPrice(fullPrice, allServicePrices) {
  return fullPrice + allServicePrices;
}

function getTitle(title) {
  title = title.trim();
  return title[0].toUpperCase() + title.slice(1).toLowerCase();
}

const getServicePercentPrice = function (fullPrice, rollback) {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

asking();

allServicePrices = getAllServicePrices();

fullPrice = getFullPrice(screenPrice, allServicePrices);

title = getTitle(title);

servicePercentPrice = getServicePercentPrice(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log("Типы экранов для разработки: " + screens);
console.log(getRollBackMessage(fullPrice));
console.log(
  "Стоимость работы за вычетом процента отката посреднику: " +
    servicePercentPrice +
    " рублей"
);
