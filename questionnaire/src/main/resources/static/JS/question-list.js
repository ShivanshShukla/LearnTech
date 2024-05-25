document.addEventListener("DOMContentLoaded", function () {
  // Toggle dropdown container visibility with smooth animation
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContainer = document.querySelector(".dropdown-container");
  dropdownBtn.addEventListener("click", function () {
    $(dropdownContainer).slideToggle();
  });

  // Fetch question details and populate form on edit button click
  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", async function () {
      const questionId = this.getAttribute("data-id");

      try {
        const response = await fetch(`/edit/${questionId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const questionDetails = await response.json();
        populateEditForm(questionDetails);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to fetch question details. Please try again.");
      }
    });
  });

  // Function to submit the edit form
  document
    .getElementById("edit-question-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const questionId = document.getElementById("editQuestionId").value;

      try {
        const updatedQuestion = {
          id: questionId,
          question: document.getElementById("editQuestion").value,
          optionA: document.getElementById("editOptionA").value,
          optionB: document.getElementById("editOptionB").value,
          optionC: document.getElementById("editOptionC").value,
          optionD: document.getElementById("editOptionD").value,
          correctAnswer: document.getElementById("editCorrectAnswer").value,
          explanation: document.getElementById("editExplanation").value,
          subjectCode: document.getElementById("editSubjectCode").value,
        };

        const response = await fetch(`/update-question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedQuestion),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert("Question updated successfully.");
        location.reload();
      } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update question. Please try again.");
      }
    });

  function populateEditForm(questionDetails) {
    document.getElementById("editQuestionId").value = questionDetails.id || "";
    document.getElementById("editQuestion").value =
      questionDetails.question || "";
    document.getElementById("editOptionA").value =
      questionDetails.optionA || "";
    document.getElementById("editOptionB").value =
      questionDetails.optionB || "";
    document.getElementById("editOptionC").value =
      questionDetails.optionC || "";
    document.getElementById("editOptionD").value =
      questionDetails.optionD || "";
    document.getElementById("editCorrectAnswer").value =
      questionDetails.correctAnswer || "";
    document.getElementById("editExplanation").value =
      questionDetails.explanation || "";
    document.getElementById("editSubjectCode").value =
      questionDetails.subjectCode || "";

    $("#editQuestionModal").modal("show");
  }
});
