// Задача о коллекции функций: у вас есть массив функций, напишите код, 
// который вызовет каждую функцию в этом массиве и выведет их порядковый номер. 
// Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.

function executeFunctions(functions) {
  // Итерируемся по массиву функций с помощью цикла for.
  for (i = 0; i < functions.length; i++) {
    // Выводим сообщение о вызове функции, индекс (начиная с 1) итерации увеличивается на 1.
    console.log(`Вызвана функция ${i + 1}`);
    // Вызываем текущую функцию из массива functions.
    functions[i]();
  }
}

functions = [
  () => console.log("Выполнена 1 функция"), 
  () => setTimeout(() => console.log("Выполнена 2 функция"), 1), 
  () => console.log("Выполнена 3 функция")
];

executeFunctions(functions);