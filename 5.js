// Разработайте функцию преобразования JSON в связный список. 
// На входе функция должна получать JSON, содержащий список объектов, 
// на выходе объект, представляющий из себя односвязный список.

class Node {
  constructor(data) {
    // Создаем узел с данными из входного JSON
    this.data = data;
    // Изначально у узла нет следующего узла
    this.next = null;
  }
}

function jsonToLinkedList(json) {
  // Проверяем, что входной JSON - это массив объектов
  if (!Array.isArray(json)) {
    throw new Error('Input JSON should be an array of objects.');
  }

  // Если JSON пуст, возвращаем null (пустой список)
  if (json.length === 0) {
    return null;
  }

  // Создаем голову списка на основе первого объекта JSON
  const head = new Node(json[0]);
  // Устанавливаем указатель current на голову
  let current = head;

  for (let i = 1; i < json.length; i++) {
    // Создаем новый узел для следующего объекта JSON
    const newNode = new Node(json[i]);
    // Устанавливаем связь между текущим узлом и новым узлом
    current.next = newNode;
    // Перемещаем указатель current на новый узел
    current = newNode;
  }

  // Возвращаем голову списка, который представлен первым узлом
  return head;
}

// Пример использования:
const jsonInput = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
];

const linkedList = jsonToLinkedList(jsonInput);
console.log(linkedList);