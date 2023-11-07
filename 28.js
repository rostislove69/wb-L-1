// Задача: Создать и добавить элемент с использованием шаблонов: 
// Напишите функцию, которая создает новый элемент с использованием шаблонов 
// (например, с помощью тега <template>) и добавляет его в DOM.


function createAndAddElement(selector, container) {
  // Получаем шаблон по селектору
  const template = document.getElementById(selector);

  // Клонируем содержимое шаблона
  const clone = document.importNode(template.content, true);

  // Добавляем клонированный элемент в DOM
  document.querySelector(container).appendChild(clone);
}