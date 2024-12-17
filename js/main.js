let title = prompt("Как называется ваш проект?");

let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let rollback = 5;

let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой допольнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");

let service2 = prompt("Какой допольнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let servicePercentPrice;
let allServicePrices;
let fullPrice;

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

const getAllServicePrices = function (servicePrice1, servicePrice2) {
  return servicePrice1 + servicePrice2;
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

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

fullPrice = getFullPrice(screenPrice, allServicePrices);

title = getTitle(title);

servicePercentPrice = getServicePercentPrice(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("Типы экранов для разработки: " + screens);
console.log(getRollBackMessage(fullPrice));
console.log(
  "Стоимость работы за вычетом процента отката посреднику: " +
    servicePercentPrice +
    " рублей"
);
