// Scripts related to sidebar
document.addEventListener("DOMContentLoaded", function () {
  // Toggle dropdown container visibility with smooth animation
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContainer = document.querySelector(".dropdown-container");
  dropdownBtn.addEventListener("click", function () {
    $(dropdownContainer).slideToggle();
  });
});
