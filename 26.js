// Задача: Рекурсивный обход дерева DOM: 
// Напишите функцию, которая рекурсивно обходит дерево DOM, начиная с указанного элемента, 
// и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).


function recursiveDOMTraversal(node) {
  // Проверяем, является ли узел элементом (тегом)
  if (node.nodeType === Node.ELEMENT_NODE) {
    // Если узел - элемент, выводим информацию о его теге в консоль
    console.log("Тег: " + node.tagName);
  }

  // Рекурсивно обходим все дочерние узлы данного узла
  for (let i = 0; i < node.childNodes.length; i++) {
    recursiveDOMTraversal(node.childNodes[i]);
  }
}

// Начинаем обход с корневого элемента, например, с элемента <body>
const rootElement = document.body;
recursiveDOMTraversal(rootElement);