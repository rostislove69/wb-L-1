// Задача о палиндроме: напишите функцию, 
// которая проверяет, является ли заданная строка палиндромом. 
// Палиндром — это строка, которая читается одинаково 
// в обоих направлениях (например, «аргентина манит негра»).

function isPolindrom (str) {
  // Избавляем строку от всех лишних знаков и пробелов 
  // с помощью регулярного выражения и приводим к нижнему регистру
  str = str.replace(/[^а-яА-Я0-9]/g, '').toLowerCase()
  // проверяем на полиндром
  return str === str.split("").reverse().join("") ? true : false;
}

console.log(isPolindrom("аргентина манит негра"));