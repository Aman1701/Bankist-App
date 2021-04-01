"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

const openModal = function() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function(e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//============================================================
//Button Scrolling
btnScrollTo.addEventListener("click", function(e) {
  //Practice with scrolling coords starts
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log("Current Scroll (X/Y", window.pageXOffset, window.pageYOffset);
  //Practice with scrolling coords ends

  //Old way of Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //Modern Way of scrolling
  section1.scrollIntoView({ behavior: "smooth" });
});

//Page Navigation

// Without Event Delegation
// document.querySelectorAll(".nav__link").forEach(function(el) {
//   el.addEventListener("click", function(e) {
//     e.preventDefault();

//     //Smooth scrolling
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//With Event Delegation
//1. Add event listener to common parent element.

//2. In that eventListener, determine what element originated the event.

document.querySelector(".nav__links").addEventListener("click", function(e) {
  // console.log(e.target);
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains("nav__link")) {
    //Smooth scrolling
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//============================================================
//Tabbed component
tabsContainer.addEventListener("click", function(e) {
  const clicked = e.target.closest(".operations__tab");

  //Ignore clicks where the result is null
  //Guard Clause is used for that
  if (!clicked) return;

  //Active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  //Activate the content area
  tabsContent.forEach((tc) =>
    tc.classList.remove("operations__content--active")
  );

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//============================================================
//Menu fade animation
const handleHover = function(e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener("mouseover", function(e) {
  handleHover(e, 0.5);
});
nav.addEventListener("mouseout", function(e) {
  handleHover(e, 1);
});
//With Bind => passing an argument into the handler function
// nav.addEventListener("mouseover", handleHover.bind(0.5));
// nav.addEventListener("mouseout", handleHover.bind(1));

//============================================================
//============================================================
//Implementing Sticky navigation
const initialCoords = section1.getBoundingClientRect();

window.addEventListener("scroll", function() {
  // console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
//Implementing Sticky navigation with Intersection observer API

//Reference
// const obsCallback = function(entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Revealing section Elements on scroll
const allSections = document.querySelectorAll(".section");
const revealSection = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//============================================================
//============================================================
//Implementing lazy loading image
const imgTargets = document.querySelectorAll("img[data-src");
const loadImg = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src attribute with data-src attribute
  entry.target.src = entry.target.dataset.src; //Here load event  will be emitted
  entry.target.addEventListener("load", function() {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//================================================================
//================================================================
//================================================================
//Building the slider
const slider = function() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  //================================================================
  //Functions

  //Handling the slider dots
  const createDots = function() {
    slides.forEach((s, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide = "${i}"></button>`
      );
    });
  };

  const activateDot = function(slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  //Hopping over slide
  const goToSlide = function(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //next Slide
  const nextSlide = function() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //prev slide
  const prevSlide = function() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function() {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  //Handling left and right keyboard events
  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") prevSlide();
    else nextSlide();
  });

  //Handling the dots slider
  dotContainer.addEventListener("click", function(e) {
    console.log(e);
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
