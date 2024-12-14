let title = "Project Title";
let screens = "Простые,Сложные,Интерактивные";
let screenPrice = 1000;
let rollback = 5;
let fullPrice = 20000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + "рублей");
console.log("Стоимость разработки сайта " + fullPrice + "рублей");

screens = screens.toLowerCase();
console.log(screens.split(","));

console.log(
  "Процент отката посреднику за работу: " + fullPrice * (rollback / 100)
);
