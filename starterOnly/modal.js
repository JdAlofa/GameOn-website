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
document.querySelector(".close").addEventListener("click", () => {
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

  if (birthdate.value === "") {
    birthdateForm.setAttribute(
      "data-error",
      "Veuillez entrer votre date de naissance."
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
    form.submit();
  }
});

function validate() {
  //////////////// validate the input fields
  let inputFieldsValidated = false;

  inputFields.forEach((element) => {
    if (element.value==="" || element.parentElement.classList.contains("data-error-visible")) {

      element.parentElement.setAttribute(
        "data-error",
        "Veuillez remplir ce champ."
      );
      element.parentElement.setAttribute("data-error-visible", "true");
      inputFieldsValidated = false;
      

    } else if  (element.value !=="" && !element.parentElement.classList.contains("data-error-visible")){
      inputFieldsValidated = true;
    }
  });

  /////////////// validate the cities checkboxes
  let citiesValidated = false;
  cities.forEach((city) => {
    if (city.checked) {
      citiesValidated = true;
      tournaments.removeAttribute("data-error");
      tournaments.removeAttribute("data-error-visible");
    } else {
      tournaments.setAttribute("data-error", "Veuillez choisir une ville.");
      tournaments.setAttribute("data-error-visible", "true");
    }
  });
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
