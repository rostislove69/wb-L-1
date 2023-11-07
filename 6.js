// Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. 
// Напишите код, который сортирует этот массив по возрастанию возраста, 
// а при равных возрастах сортирует по алфавиту по полю name.


function customSort(arr) {
  // Используем метод sort() для сортировки массива, передавая функцию сравнения.
  return arr.sort((a, b) => {
    // Если возраст a и b совпадают, сравниваем их имена лексикографически.
    if (a.age === b.age) {
      return a.name.localeCompare(b.name);
    } else {
      // Если возраст a не равен возрасту b, сортируем по возрасту, от меньшего к большему.
      return a.age - b.age;
    }
  });
}

const people = [
  { name: 'John', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Eve', age: 22 },
];

console.log(customSort(people));