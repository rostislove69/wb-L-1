// Задача: Создать и добавить стиль для элемента: 
// Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.


function createAndStyleElement(type, styles, selector) {
  // Создаем новый элемент
  const newElement = document.createElement(type);

  // Определяем контейнер, куда нужно вставить элемент
  const container = document.querySelector(selector);

  // Устанавливаем стили для элемента
  styles.forEach(style => {
    // Получаем ключ стиля (например, "width" или "color")
    const objectKey = Object.keys(style)[0];
    // Получаем значение стиля (например, "100px" или "red")
    const objectValue = style[objectKey];
    // Применяем стиль к элементу
    newElement.style[objectKey] = objectValue;
  });

  // Добавляем элемент в DOM
  container.appendChild(newElement);
}

// Пример вызова функции для создания и стилизации элемента
createAndStyleElement("div", [{"width": "100px"}, {"color": "red"}], ".header");





