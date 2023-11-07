// Задача на модули и использование внешних библиотек: напишите модуль, 
// который экспортирует функцию для работы с датами. 
// Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

const moment = require('moment');

// Функция для получения текущей даты в заданном формате
function getCurrentDate(format) {
  return moment().format(format);
}

// Функция для добавления указанного количества дней к заданной дате
function addDays(date, days, format) {
  const newDate = moment(date, format).add(days, 'days');
  return newDate.format(format);
}

// Экспортируем функции для использования в других модулях
module.exports = {
  getCurrentDate,
  addDays,
};