import * as Constants from "../constants";

export const formValidation = (
  email?: string,
  password?: string,
  name?: string,
  confirmPassword?: string,
  phone_number?: Number,
  address?: any,
  zip_code?: Number,
  city?: string,
  country?: string,
  title?: string,
  content?: string
) => {
  let isValid: boolean = true;
  let error: any = [];

  if (email !== undefined) {
    if (!email) {
      error.push({ input: "email", message: "Email is required." });
      isValid = false;
    } else if (!email.match(Constants.VALID_EMAIL) && email) {
      error.push({ input: "email", message: "Email format incorrect." });
      isValid = false;
    }
  }

  if (password !== undefined) {
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

  if (phone_number !== undefined) {
    if (!phone_number) {
      error.push({
        input: "phone_number",
        message: "Phone Number is required.",
      });
      isValid = false;
    }
  }

  if (address !== undefined) {
    if (!address) {
      error.push({ input: "address", message: "Address is required." });
      isValid = false;
    }
  }

  if (zip_code !== undefined) {
    if (!zip_code) {
      error.push({ input: "zip_code", message: "ZIP Code is required." });
      isValid = false;
    }
  }

  if (city !== undefined) {
    if (!city) {
      error.push({ input: "city", message: "City is required." });
      isValid = false;
    }
  }

  if (country !== undefined) {
    if (!country) {
      error.push({ input: "country", message: "Country is required." });
      isValid = false;
    }
  }

  if (title !== undefined) {
    if (!title) {
      error.push({ input: "title", message: "Title is required." });
      isValid = false;
    }
  }

  if (content !== undefined) {
    if (!content) {
      error.push({ input: "content", message: "Experience is required." });
      isValid = false;
    }
  }

  return [isValid, error];
};
