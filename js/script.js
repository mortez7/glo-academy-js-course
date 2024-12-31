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

  init: function () {
    this.addTitle();

    startBtn.addEventListener("click", appData.start);
    resetBtn.addEventListener("click", appData.reset);
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
    this.screenPrice = this.screens.reduce(
      (sum, screen) => (sum += +screen.price),
      0
    );

    this.screensTotalCount = this.screens.reduce(
      (sum, screen) => (sum += +screen.count),
      0
    );

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
  },

  addRollback: function () {
    rangeValue.textContent = `${rangeInput.value}%`;
    appData.rollback = rangeInput.value;
    if (fullTotalCount.value > 0) {
      appData.servicePercentPrice = Math.ceil(
        appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
      );

      totalCountRollback.value = appData.servicePercentPrice;
    }
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.screensTotalCount;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
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

  disableItems: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      const select = screen.querySelector("select");

      input.disabled = true;
      select.disabled = true;
    });

    startBtn.style.display = "none";
    resetBtn.style.display = "block";
  },

  clearData: function () {
    appData.screenPrice = 0;
    appData.screensTotalCount = 0;
    appData.rollback = 0;
    appData.servicesPercent = [];
    appData.servicesNumber = [];
    appData.servicePercentPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.fullPrice = 0;
  },

  clearScreens: function () {
    let screens = document.querySelectorAll(".screen");

    for (let i = 0; i < screens.length; i++) {
      if (i < screens.length - 1) {
        screens[i].remove();
      } else {
        const input = screens[i].querySelector("input");
        const select = screens[i].querySelector("select");

        input.disabled = false;
        input.value = "";

        select.disabled = false;
        select.selectedIndex = 0;
      }
    }

    appData.screens = [];
    //appData.addScreens();
  },

  clearServices: function () {
    otherPercentItems.forEach((item) => {
      item.querySelector("input[type=checkbox]").checked = false;
    });

    otherNumberItems.forEach((item) => {
      item.querySelector("input[type=checkbox]").checked = false;
    });
  },

  clearRollback: function () {
    rangeValue.textContent = "0%";
    rangeInput.value = 0;
  },

  clearResults: function () {
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
  },

  start: function () {
    if (appData.checkScreenValues()) {
      appData.addScreens();
      appData.addServices();
      appData.addPrices();
      appData.showResult();
      appData.disableItems();
    }

    // appData.logger();
  },

  reset: function () {
    resetBtn.style.display = "none";
    startBtn.style.display = "block";
    appData.clearData();
    appData.clearScreens();
    appData.clearServices();
    appData.clearRollback();
    appData.clearResults();
    console.log(appData);
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

const isNumber = (num) => {
  if (num === null) {
    return 0;
  }

  return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = (str) => {
  return typeof str === "string" && /[^\d]/.test(str);
};

appData.init();
