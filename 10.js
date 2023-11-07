// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

function convertStringToJson(jsonString) {
  try {
    // Сначала производим "очистку" JSON-строки от некоторых символов, чтобы сделать её безопасной для new Function.
    const sanitizedString = jsonString
      .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@') // Удаляем экранированные символы.
      .replace(/["\\\n\r\u2028\u2029]/g, ''); // Удаляем непечатаемые символы и символы перевода строки.

    // Затем используем new Function для выполнения строки как JavaScript-кода и возвращаем результат.
    const jsonObject = (new Function('return ' + sanitizedString))();

    // Проверяем, что результат - объект, и возвращаем его.
    if (typeof jsonObject === 'object' && jsonObject !== null) {
      return jsonObject;
    } else {
      console.error("Не удалось распарсить JSON. Возвращенное значение не является объектом.");
      return null;
    }
  } catch (error) {
    // В случае ошибки выводим сообщение и возвращаем null.
    console.error("Ошибка при попытке распарсить JSON:", error);
    return null;
  }
}

// Пример использования
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = convertStringToJson(jsonString);

if (jsonObject) {
  console.log("JSON успешно распарсен:", jsonObject);
} else {
  console.log("Не удалось распарсить JSON.");
}