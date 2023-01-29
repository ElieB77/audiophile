import * as Constants from "../constants";

export const formValidation = (
  email: string,
  password: string,
  name?: string,
  confirmPassword?: string
) => {
  let isValid: boolean = true;
  let error: any = [];

  if (!email) {
    error.push({ input: "email", message: "Email is required." });
    isValid = false;
  } else if (!email.match(Constants.VALID_EMAIL) && email) {
    error.push({ input: "email", message: "Email format incorrect." });
    isValid = false;
  }

  if (!password) {
    error.push({ input: "password", message: "Password is required." });
    isValid = false;
  } else if (password.length < 8) {
    error.push({
      input: "password",
      message: "Password must be at least 8 characters long.",
    });
    isValid = false;
  }

  if (confirmPassword !== undefined) {
    if (!confirmPassword) {
      isValid = false;
      error.push({
        input: "confirmPassword",
        message: "Password confirmation is required.",
      });
    } else if (confirmPassword !== password) {
      error.push({
        input: "confirmPassword",
        message: "Passwords dont match.",
      });
      isValid = false;
    }
  }

  if (name !== undefined) {
    if (!name) {
      error.push({ input: "name", message: "Name is required." });
      isValid = false;
    } else if (name.length < 4) {
      error.push({
        input: "name",
        message: "Name must be at least 4 characters long.",
      });
      isValid = false;
    }
  }

  return [isValid, error];
};
