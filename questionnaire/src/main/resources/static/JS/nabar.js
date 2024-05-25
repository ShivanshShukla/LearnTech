// navbar.js

document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContainer = document.querySelector(".dropdown-container");

  dropdownBtn.addEventListener("click", function () {
    $(dropdownContainer).slideToggle();
  });
});
