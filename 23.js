// Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля. 
// Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах. 
// Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

function analyzePasswordStrength(password) {
  const minLength = 8; // Минимальная длина пароля
  const minUpperCase = 1; // Минимальное количество заглавных букв
  const minLowerCase = 1; // Минимальное количество строчных букв
  const minDigits = 1; // Минимальное количество цифр
  const minSpecialChars = 1; // Минимальное количество специальных символов

  // Проверяем длину пароля
  if (password.length < minLength) {
    return "Слишком короткий пароль. Минимальная длина - " + minLength + " символов.";
  }

  // Проверяем наличие заглавных букв
  if (password.replace(/[^A-Z]/g, "").length < minUpperCase) {
    return "Добавьте хотя бы " + minUpperCase + " заглавных букв.";
  }

  // Проверяем наличие строчных букв
  if (password.replace(/[^a-z]/g, "").length < minLowerCase) {
    return "Добавьте хотя бы " + minLowerCase + " строчных букв.";
  }

  // Проверяем наличие цифр
  if (password.replace(/[^0-9]/g, "").length < minDigits) {
    return "Добавьте хотя бы " + minDigits + " цифр.";
  }

  // Проверяем наличие специальных символов
  if (password.replace(/[A-Za-z0-9]/g, "").length < minSpecialChars) {
    return "Добавьте хотя бы " + minSpecialChars + " специальных символов.";
  }

  return "Пароль сложный.";
}

console.log(analyzePasswordStrength("Qwert12345!"));