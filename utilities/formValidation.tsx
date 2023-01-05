import * as Constants from "../constants";

export const formValidation = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  let isValid = true;

  if (!name) {
    console.log("name is required");
    isValid = false;
  } else if (name.length < 4) {
    console.log("Name must be at least 4 characters long");
    isValid = false;
  }

  if (!email) {
    console.log("email is required");
    isValid = false;
  } else if (!email.match(Constants.validEmail) && email) {
    console.log("Email format incorrect");
    isValid = false;
  }

  if (!password) {
    console.log("password is required");
    isValid = false;
  } else if (password.length < 8) {
    console.log("Password must be at least 8 characters long");
    isValid = false;
  }

  if (!confirmPassword) {
    console.log("password confirmation is required");
    isValid = false;
  } else if (confirmPassword !== password) {
    console.log("Passwords dont match");
    isValid = false;
  }

  return isValid;
};
