export function isEmailValid(email: string): boolean {
  return email.trim().includes('@');
}

export function getPasswordError(password: string): string | null {
  if (!password) return null;
  if (password.length < 8) return 'Пароль должен быть минимум 8 символов';
  if (!/[a-z]/.test(password)) return 'Пароль должен содержать строчную букву';
  if (!/[A-Z]/.test(password)) return 'Пароль должен содержать заглавную букву';
  if (!/[0-9]/.test(password)) return 'Пароль должен содержать цифру';
  return null;
}

export function getConfirmPasswordError(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) return null;
  if (confirmPassword !== password) return 'Пароли не совпадают';
  return null;
}
