function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.getElementsByTagName("form")[0];
const inputFields = document.querySelectorAll(".formData .text-control");
const formDatas = document.querySelectorAll(".formData");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
const modalContent = document.querySelector(".content");

// launch modal form
function launchModal() {
  modalContent.style.animationName = "modalopen";
  modalbg.style.display = "block";
}

// ISSUE 1 :closing the modal form
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  // modalContent.style.animationName = "modalclose";
  form.reset();
  modalbg.style.display = "none";

  // removing style changes and error modifications
  formDatas.forEach((element) => {
    element.removeAttribute("data-error");
    element.removeAttribute("data-error-visible");
  });
});

// ISSUE 2 : form validation

// 1. First name

const firstName = document.getElementById("first");
const firstNameForm = document.getElementById("firstNameForm");

firstName.addEventListener("input", () => {
  if (firstName.value.trim().length < 2) {
    firstNameForm.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour votre prénom."
    );
    firstNameForm.setAttribute("data-error-visible", "true");
  } else {
    firstNameForm.removeAttribute("data-error");
    firstNameForm.removeAttribute("data-error-visible");
  }
});

// 2. Last name

const lastName = document.getElementById("last");
const lastNameForm = document.getElementById("lastNameForm");

lastName.addEventListener("input", () => {
  if (lastName.value.trim().length < 2) {
    lastNameForm.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour votre nom."
    );
    lastNameForm.setAttribute("data-error-visible", "true");
  } else {
    lastNameForm.removeAttribute("data-error");
    lastNameForm.removeAttribute("data-error-visible");
  }
});

//  3. Email

const email = document.getElementById("email");
const emailForm = document.getElementById("emailForm");

email.addEventListener("input", function () {
  // regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailForm.setAttribute("data-error", "Veuillez entrer un email valide.");
    emailForm.setAttribute("data-error-visible", "true");
  } else {
    emailForm.removeAttribute("data-error");
    emailForm.removeAttribute("data-error-visible");
  }
});

// 4. Birthdate
const birthdate = document.getElementById("birthdate");
const birthdateForm = document.getElementById("birthdateForm");

birthdate.addEventListener("input", () => {
  const birthdateValue = new Date(birthdate.value);
  const ageDiffMs = Date.now() - birthdateValue.getTime();
  const ageDate = new Date(ageDiffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (birthdate.value === NaN || birthdate.value === "") {
    birthdateForm.setAttribute(
      "data-error",
      "Veuillez entrer une date de naissance valide."
    );
    birthdateForm.setAttribute("data-error-visible", "true");
  } else if (age < 16) {
    birthdateForm.setAttribute(
      "data-error",
      "Vous devez avoir plus de 16 ans pour vous inscrire."
    );
    birthdateForm.setAttribute("data-error-visible", "true");
  } else {
    birthdateForm.removeAttribute("data-error");
    birthdateForm.removeAttribute("data-error-visible");
  }
});

// 5. Amount of tournaments
const quantity = document.getElementById("quantity");
const pastTournamentsForm = document.getElementById("pastTournamentsForm");

quantity.addEventListener("input", () => {
  if (quantity.value === "") {
    pastTournamentsForm.setAttribute(
      "data-error",
      "Veuillez entrer un nombre de tournois."
    );
    pastTournamentsForm.setAttribute("data-error-visible", "true");
  } else {
    pastTournamentsForm.removeAttribute("data-error");
    pastTournamentsForm.removeAttribute("data-error-visible");
  }
});

// 6. City
const tournaments = document.getElementById("tournaments");
const cities = document.querySelectorAll('input[name="location"]');

// 7. Terms of service

const tos = document.getElementById("checkbox1");
const tosForm = document.getElementById("tosForm");

// 8. Submit button

const submit = document.querySelector(".btn-submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();

  if (validate()) {
    const confirmationMessage = document.querySelector("#confirmation-message");
    confirmationMessage.style.display = "block";
    setTimeout(() => {
      confirmationMessage.style.display = "none";
      submit.style.display = "none";
      form.submit();
    }, 3000);
  }
});

function validate() {
  //////////////// validate the input fields
  let inputFieldsValidated = false;
  let correctInputFields = 0;

  for (let i = 0; i < inputFields.length; i++) {
    if (
      inputFields[i].parentElement.hasAttribute("data-error-visible") ||
      inputFields[i].value === ""
    ) {
      inputFieldsValidated = false;
      inputFields[i].parentElement.setAttribute(
        "data-error",
        "Veuillez remplir ce champ."
      );
      inputFields[i].parentElement.setAttribute("data-error-visible", "true");
    }
  }
  for (let i = 0; i < inputFields.length; i++) {
    if (
      inputFields[i].value !== "" &&
      inputFields[i].parentElement.hasAttribute("data-error-visible") === false
    ) {
      correctInputFields++;
      inputFields[i].parentElement.removeAttribute("data-error");
      inputFields[i].parentElement.removeAttribute("data-error-visible");
    }
  }

  for (let i = 0; i < inputFields.length; i++) {
    if (correctInputFields === inputFields.length) {
      inputFieldsValidated = true;
    } else {
      inputFieldsValidated = false;
    }
  }

  /////////////// validate the cities checkboxes
  let citiesValidated = false;
  cities.forEach((city) => {
    if (city.checked) {
      citiesValidated = true;
      tournaments.removeAttribute("data-error");
      tournaments.removeAttribute("data-error-visible");
    }
  });

  if (citiesValidated === false) {
    tournaments.setAttribute("data-error", "Veuillez choisir une ville.");
    tournaments.setAttribute("data-error-visible", "true");
    // adds an event listener to check if any button input is checked and then removes the attributes
    cities.forEach((city) => {
      city.addEventListener("input", () => {
        if (city.checked) {
          tournaments.removeAttribute("data-error");
          tournaments.removeAttribute("data-error-visible");
          citiesValidated = true;
        }
      });
    });
  }
  ////////////// Validate the terms of service checkbox

  let tosValidated = false;

  if (!tos.checked) {
    tosForm.setAttribute(
      "data-error",
      "Veuillez accepter les conditions d'utilisation."
    );
    tosForm.setAttribute("data-error-visible", "true");
    tos.addEventListener("input", () => {
      if (tos.checked) {
        tosForm.removeAttribute("data-error");
        tosForm.removeAttribute("data-error-visible");
        tosValidated = true;
      } else {
        tosValidated = false;
      }
    });
  } else {
    tosValidated = true;
  }

  // Validate the form

  if (tosValidated && citiesValidated && inputFieldsValidated) {
    return true;
  } else {
    return false;
  }
}
