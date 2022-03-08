function signupValidateValue({ name, email, password }) {
  let error = "";
  if (!name) {
    error = "Please Provide your Name";
  }
  if (!email) {
    error = "Please Provide your Email";
  } else if (!email.match(/\S+@\S+\.\S+/)) {
    error = "Please Provide your Correct Email";
  }
  if (!password) {
    error = "Please Provide your Password";
  } else if (password.length < 6) {
    error = "Password must be greater than 6 characters";
  } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
    error =
      "Password must be minimum 6 Characters and one letter and one number";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
}

export { signupValidateValue };
