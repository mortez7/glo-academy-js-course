"use strict";

const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn");
const otherPercentItems = document.querySelectorAll(".other-items.percent");
const otherNumberItems = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector(
  ".rollback .main-controls__range input"
);
const rangeValue = document.querySelector(".range-value");
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  screensTotalCount: 0,
  rollback: 0,
  adaptive: true,
  servicesPercent: [],
  servicesNumber: [],
  servicePercentPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
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

  init: function () {
    appData.addTitle();

    startBtn.addEventListener("click", appData.start);
    plusBtn.addEventListener("click", appData.addScreenBlock);
    rangeInput.addEventListener("input", appData.addRollback);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addServices: function () {
    otherPercentItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherNumberItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(
      (sum, screen) => (sum += +screen.price),
      0
    );

    appData.screensTotalCount = appData.screens.reduce(
      (sum, screen) => (sum += +screen.count),
      0
    );

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  addRollback: function () {
    rangeValue.textContent = `${rangeInput.value}%`;
    appData.rollback = rangeInput.value;
    if (totalCountRollback.value > 0) {
      appData.servicePercentPrice = Math.ceil(
        appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
      );

      totalCountRollback.value = appData.servicePercentPrice;
    }
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.screensTotalCount;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },

  checkScreenValues: function () {
    screens = document.querySelectorAll(".screen");

    let allValid = true;
    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      const select = screen.querySelector("select");

      if (!input.value.trim() || !select.value) {
        allValid = false;
      }
    });

    return allValid;
  },

  start: function () {
    if (appData.checkScreenValues()) {
      appData.addScreens();
      appData.addServices();
      appData.addPrices();
      appData.showResult();
    }

    // appData.logger();
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

appData.init();
