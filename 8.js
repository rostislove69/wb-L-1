// Задача о замыканиях: напишите функцию, которая будет принимать массив функций 
// и возвращать новую функцию, которая вызывает каждую функцию в этом массиве 
// и возвращает массив результатов, полученных после вызова каждой функции.

function executeFunctions(functions) {
  // Внутри executeFunctions определяется вложенная функция functionsResult.
  function functionsResult() {
    // Создаем пустой массив results, в который будем сохранять результаты выполнения функций.
    let results = [];
    // Итерируемся по массиву функций и вызываем каждую функцию.
    for (i = 0; i < functions.length; i++) {
      // Вызываем текущую функцию из массива functions и добавляем её результат в массив results.
      results.push(functions[i]());
    }
    // Возвращаем массив results, содержащий результаты выполнения всех функций.
    return results;
  }
  // Возвращаем функцию functionsResult в качестве результата функции executeFunctions.
  return functionsResult;
}

functions = [
  () => "Выполнена 1 функция", 
  () => "Выполнена 2 функция",
  () => "Выполнена 3 функция"
];

const functionResult = executeFunctions(functions);

console.log(functionResult());
