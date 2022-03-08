function signinValidateValue(email, password) {
  let error = "";

  if (!email) {
    error = "Please Provide your Email";
  } else if (!email.match(/\S+@\S+\.\S+/)) {
    error = "Please Provide your Correct Email";
  }
  if (!password) {
    error = "Invalid Credentials";
  } else if (password.length < 6) {
    error = "Invalid Credentials";
  } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
    error = "Invalid Credentials";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
}

export { signinValidateValue };
