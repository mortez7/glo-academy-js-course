"use strict";

const library = document.querySelector(".books");
const books = document.querySelectorAll(".book");

library.prepend(books[1]);
library.append(books[2]);
books[4].after(books[3]);

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

books[4].querySelector("a").textContent = "Книга 3. this и Прототипы Объектов";

let chapters = books[0].querySelectorAll("li");
chapters[9].after(chapters[2]);
chapters[3].after(chapters[6]);
chapters[6].after(chapters[8]);

chapters = books[5].querySelectorAll("li");
chapters[1].after(chapters[9]);
chapters[9].after(chapters[3]);
chapters[3].after(chapters[4]);
chapters[7].after(chapters[5]);

books[2]
  .querySelector("ul")
  .lastElementChild.insertAdjacentHTML(
    "beforebegin",
    "<li>Глава 8: За пределами ES6</li>"
  );
