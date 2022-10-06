// SET UP
const navLinks = document.querySelectorAll(".header_list--link");
const selections = document.querySelector(".sec_2_selection");
const selectionItem = document.querySelectorAll(".sec_2_selection--item");
const tabContainer = document.querySelector(".accordion_wrap");
const tabs = document.querySelectorAll(".accordion_2");
const faqWrap = document.querySelector(".faq_content");
const faqQuestion = document.querySelectorAll(".faq_title");
const faqAnwsers = document.querySelectorAll(".faq_anwser");
const arrowImg = document.querySelectorAll(".arrow");
const input = document.getElementById("email");
const inputWrap = document.querySelector(".input");
const errorImg = document.querySelector(".errorImg");
const errorMsg = document.querySelector(".error_msg");
const contactBtn = document.getElementById("contactBtn");
const mobileMenu = document.querySelector(".mobile_menu");
const closer = document.getElementById("closer");
const hamburger = document.querySelector(".menu");

//FUNCTIONALITY

//page navigation

navLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  })
);

// tabbed component
selections.addEventListener("click", function (e) {
  const clicked = e.target.closest(".sec_2_selection--item");
  if (!clicked) {
    return;
  }
  selectionItem.forEach((item) => item.classList.remove("border"));
  clicked.classList.add("border");
  //activate content
  tabs.forEach((tab) => tab.classList.remove("active"));
  document
    .querySelector(`.accordion-tab-${clicked.dataset.tab}`)
    .classList.add("active");
});

//FAQ accordion

faqWrap.addEventListener("click", function (e) {
  const clicked = e.target.closest(".faq_title");
  if (!clicked) {
    arrowImg.forEach((arrow) => arrow.classList.remove("img-active"));
    faqAnwsers.forEach((anws) => anws.classList.remove("anwser-active"));
    return;
  }

  faqAnwsers.forEach((anws) => anws.classList.remove("anwser-active"));
  document
    .querySelector(`.anwser${clicked.dataset.question}`)
    .classList.add("anwser-active");
  arrowImg.forEach((arrow) => arrow.classList.remove("img-active"));
  clicked.querySelector("img").classList.add("img-active");
});

//email validation
const showErr = () => {
  errorImg.classList.add("errorImg-active");
  errorMsg.classList.add("error_msg-active");
  inputWrap.classList.add("error");
};

const hideErr = () => {
  errorImg.classList.remove("errorImg-active");
  errorMsg.classList.remove("error_msg-active");
  inputWrap.classList.remove("error");
};

const emailValidation = function (e) {
  e.preventDefault();
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(input.value)) {
    showErr();
    return;
  }
  hideErr();
};

contactBtn.addEventListener("click", emailValidation);

// revealing sections on scroll

const allSections = document.querySelectorAll("section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  entry.target.classList.remove("section--hidden");
};

const secionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  secionObserver.observe(section);
});

// mobile menu
hamburger.addEventListener("click", function () {
  mobileMenu.classList.add("mobile_menu--active");
  console.log("show");
});
closer.addEventListener("click", function () {
  mobileMenu.classList.remove("mobile_menu--active");
  console.log("hide");
});
