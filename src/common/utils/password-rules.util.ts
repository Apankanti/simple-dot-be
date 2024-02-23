export function validatePassword(password: string): boolean {
  const regexPasswordRules = /^(?=.*\d)(?=.*[@#$%^&+=!*])(?=.*[^\s]).{8,30}$/;
  const regexInstance = new RegExp(regexPasswordRules);
  return regexInstance.test(password);
}
