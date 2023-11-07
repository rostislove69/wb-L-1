// Реализовать функцию конвертации JSON в строку.

function convertObjectToJSON(obj) {
  // Проверяем, является ли obj объектом и не является ли null.
  if (typeof obj === 'object' && obj !== null) {
    // Получаем массив ключей объекта obj.
    const keys = Object.keys(obj);
    // Создаем массив для хранения строк JSON.
    const jsonStringArray = [];

    // Итерируемся по ключам объекта c помощью forEach.
    keys.forEach(key => {
      const value = obj[key];
      // Обрамляем ключ в двойные кавычки.
      const keyString = `"${key}"`;

      // Проверяем, является ли значение объектом и не является ли null.
      if (typeof value === 'object' && value !== null) {
        // Рекурсивно вызываем convertObjectToJSON для вложенного объекта и добавляем его в массив jsonStringArray.
        const nestedJsonString = convertObjectToJSON(value);
        jsonStringArray.push(`${keyString}:${nestedJsonString}`);
      } else {
        // Если значение не является объектом, обрамляем его в двойные кавычки, если это строка.
        const valueString = (typeof value === 'string') ? `"${value}"` : value;
        jsonStringArray.push(`${keyString}:${valueString}`);
      }
    })

    // Собираем все строки JSON в одну строку и возвращаем её в виде объекта JSON.
    return `{${jsonStringArray.join(',')}}`;
  }

  // Если obj не является объектом, возвращаем его без изменений.
  return obj;
}

const jsonData = {
  name: "John",
  age: 30,
  city: "New York"
};

const jsonString = convertObjectToJSON(jsonData);

console.log(jsonString);
