// Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).
// В Chrome и Opera - 13920
// В Firefox - 33662

(function () {
  // Создаем переменную counter и инициализируем её значением 0
  let counter = 0;

  // Определяем функцию func
  const func = () => {
    // Внутренняя функция innerFunc
    const innerFunc = () => {
      // Увеличиваем счетчик при каждом вызове innerFunc
      counter++;
      // Рекурсивный вызов innerFunc
      innerFunc();
    };

    try {
      // Вызываем innerFunc для создания рекурсии
      innerFunc();
    } catch (error) {
      // Словили ошибку переполнения стека и выводим значение счетчика в консоль
      console.log(`Максимальный размер стека: ${counter}`);
    }
  };

  // Вызываем функцию func, начиная рекурсию
  func();
})();