// Задача: Добавить анимацию для элемента: 
// Напишите функцию, которая добавляет анимацию для элемента на веб-странице, например, 
// плавное изменение его положения или размера.


function animateElement(selector) {
  // Находим элемент в DOM, используя переданный селектор
  const element = document.querySelector(selector);

  // Проверяем, был ли найден элемент, и выводим сообщение об ошибке, если нет
  if (!element) {
    console.error(`Элемент с селектором "${selector}" не найден.`);
    return;
  }

  // Определение начальной ширины и высоты элемента
  const initialWidth = parseInt(element.style.width, 10) || 100;
  const initialHeight = parseInt(element.style.height, 10) || 100;

  // Задаем целевую ширину и высоту для анимации
  const targetWidth = 200;
  const targetHeight = 200;

  // Устанавливаем длительность анимации в миллисекундах
  const animationDuration = 1000; // 1 секунда

  // Получаем текущее время для начала анимации
  const startTime = performance.now();

  // Функция анимации, вызываемая в цикле через requestAnimationFrame
  function animate(currentTime) {
    // Вычисляем прошедшее время с начала анимации
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < animationDuration) {
      // Вычисляем прогресс анимации в интервале [0, 1]
      const progress = elapsedTime / animationDuration;

      // Интерполируем новую ширину и высоту на основе прогресса
      const newWidth = initialWidth + (targetWidth - initialWidth) * progress;
      const newHeight = initialHeight + (targetHeight - initialHeight) * progress;

      // Устанавливаем новую ширину и высоту элементу
      element.style.width = newWidth + 'px';
      element.style.height = newHeight + 'px';

      // Запрашиваем следующий кадр анимации
      requestAnimationFrame(animate);
    } else {
      // Если прошло достаточно времени, устанавливаем конечную ширину и высоту
      element.style.width = targetWidth + 'px';
      element.style.height = targetHeight + 'px';
    }
  }

  // Начинаем анимацию, вызывая первый кадр анимации
  requestAnimationFrame(animate);
}
