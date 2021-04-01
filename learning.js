"use strict";

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//Selecting elements
// console.log(document.documentElement);

// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);
// document.getElementById("section--1");
// const allbuttons = document.getElementsByTagName("button");
// console.log(allbuttons);
// document.getElementsByClassName("btn");

// //Creating and inserting elements
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// // message.textContent = "We use cookies for improved analytics";
// message.innerHTML =
//   "We use cookies for improved analytics. <button class='btn btn--close--cookie'> Got it!</button> ";
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);

// //Delete elements
// document
//   .querySelector(".btn--close--cookie")
//   .addEventListener("click", function() {
//     message.remove();
//   });

// //Styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// console.log(getComputedStyle(message).color);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// //Attributes

// //Getting the value of attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// //Setting the value of attributes
// logo.alt = "AMan";

// const link = document.querySelector(".nav__link--btn");
// console.log(link.href);
// console.log(link.getAttribute("href"));

// //Classes
// // logo.classList.add("c", "j");
// // logo.classList.remove();
// // logo.classList.toggle();
// // logo.classList.contains();

// //Event handlers
// const h1 = document.querySelector("h1");
// const alerth1 = function(e) {
//   alert("You are reading the heading.");

//   h1.removeEventListener("mouseenter", alerth1);
// };
// h1.addEventListener("mouseenter", alerth1);

// //Event bubbling and capturing
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);

//   //   //Stop event propagation
//   //   e.stopPropagation();
// });
// document.querySelector(".nav__links").addEventListener("click", function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Container", e.target, e.currentTarget);
// });
// document.querySelector(".nav").addEventListener("click", function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Nav", e.target, e.currentTarget);
// });

//DOM Traversing
// const h1 = document.querySelector("h1");
// //Traversing downwards : child elements
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.children);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "white";

// //Traversing upwards : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.changeBackgroundColor = "var(--gradient-secondary)";

// //Selecting siblings
// console.log(h1.previousElementSibling());
// console.log(h1.nextElementSibling());

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// //Selecting all the siblings
// console.log(h1.parentElement.children);

//========================================================
//========================================================

//Lifecycle DOM and Events
document.addEventListener("DOMContentLoaded", function(e) {
  console.log("HTML parsed and DOM tree built", e);
});

window.addEventListener("load", function(e) {
  console.log(e);
});

window.addEventListener("beforeunload", function(e) {
  e.preventDefault();
  e.returnValue = "";
});
