const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastname = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  data.password = !isEmpty(data.password) ? data.password : "";

  //userName cheks

  // firstName checks
  if (Validator.isEmpty(data.firstname)) {
    errors.firstName = "Le champ du prénom est obligatoire";
  } // lastName checks
  if (Validator.isEmpty(data.lastname)) {
    errors.lastName = "Le champ du nom est obligatoire";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Le champ du email est obligatoire";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email est invalide";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Le champ du mot de passe est obligatoire";
  }
  
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit être au moins de 6 caractères";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
