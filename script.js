document.addEventListener("DOMContentLoaded", () => {
  // --- TEMPLATE SELECTION ---
  const radios = document.querySelectorAll(".template-radio");
  const cards = document.querySelectorAll(".template-card");
  const proceedContainer = document.getElementById("proceed-container");

  radios.forEach((radio, index) => {
    radio.addEventListener("change", () => {
      cards.forEach(card => card.classList.remove("selected"));
      if (radio.checked) {
        cards[index].classList.add("selected");
        proceedContainer.style.display = "block";
      }
    });
  });

  // --- GET STARTED REDIRECT ---
  const getStartedBtn = document.getElementById("getStartedBtn");
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      window.location.href = "templates.html";
    });
  }

  // --- PROCEED TO FORM ---
  const proceedBtn = document.getElementById("proceedBtn");
  if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
      const selectedTemplate = document.querySelector('input[name="template"]:checked');
      if (selectedTemplate) {
        const templateId = selectedTemplate.getAttribute("data-template-id");
        localStorage.setItem("selectedTemplate", templateId);
        window.location.href = "form.html";
      } else {
        alert("Please select a template before proceeding.");
      }
    });
  }

  // --- FORM SUBMISSION ---
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form from refreshing

      const phone = document.getElementById("phone").value.trim();
      const startYear = document.getElementById("startYear").value.trim();
      const endYear = document.getElementById("endYear").value.trim();
      const summary = document.getElementById("summary").value.trim();
      const skills = document.getElementById("skills").value.trim();
      const project1Title = document.getElementById("projectTitle1").value.trim();
      const project1Desc = document.getElementById("projectDesc1").value.trim();

      // --- Custom Validations ---
      if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
      }

      if (!/^\d{4}$/.test(startYear) || !/^\d{4}$/.test(endYear)) {
        alert("Start Year and End Year must be 4-digit numbers.");
        return;
      }

      if (parseInt(startYear) > parseInt(endYear)) {
        alert("Start Year cannot be after End Year.");
        return;
      }

      if (summary.length < 30) {
        alert("Summary should be at least 30 characters long.");
        return;
      }

      if (skills === "") {
        alert("Please enter at least one skill.");
        return;
      }

      if (project1Title === "" || project1Desc === "") {
        alert("Project 1 Title and Description are required.");
        return;
      }

      // --- Collect Form Data ---
      const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone,
        linkedin: document.getElementById("linkedin").value,
        summary,
        skills,
        college: document.getElementById("college").value,
        degree: document.getElementById("degree").value,
        startYear,
        endYear,
        projects: [
          { title: project1Title, desc: project1Desc },
          {
            title: document.getElementById("projectTitle2").value,
            desc: document.getElementById("projectDesc2").value,
          },
          {
            title: document.getElementById("projectTitle3").value,
            desc: document.getElementById("projectDesc3").value,
          },
        ],
        tagline: document.getElementById("tagline").value,
      };

      const profileInput = document.getElementById("profilePic");
      const selectedTemplate = localStorage.getItem("selectedTemplate") || "template1";

      // --- Save & Redirect Immediately ---
      const saveAndRedirect = () => {
        localStorage.setItem("portfolioData", JSON.stringify(formData));
        window.location.href = `${selectedTemplate}.html`;
      };

      if (profileInput && profileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function () {
          formData.profilePic = reader.result;
          saveAndRedirect();
        };
        reader.readAsDataURL(profileInput.files[0]);
      } else {
        formData.profilePic = "";
        saveAndRedirect();
      }
    });
  }
});
