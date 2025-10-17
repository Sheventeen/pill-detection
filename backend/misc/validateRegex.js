export const validatePassword = (password) => {
  // Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validateGmail = (email) => {
  // Regex to match Gmail addresses only
  const regex = /^[a-z0-9._%+-]+@gmail\.com$/i;
  return regex.test(email);
};