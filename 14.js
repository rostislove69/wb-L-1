// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, 
// который разрешается с данными об изображении, когда оно загружено. 
// Когда говорится "промис разрешается с данными об изображении", это означает, 
// что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как изображение будет загружено.

function loadImage(url) {
  // Создаем новый Promise, которое выполнится, когда изображение будет загружено или возникнет ошибка.
  return new Promise((resolve, reject) => {
    // Создаем новый объект Image, который будет использоваться для загрузки изображения.
    const image = new Image();

    // Устанавливаем обработчик события "onload", который вызовется, когда изображение будет успешно загружено.
    image.onload = () => {
      resolve(image); // Вызываем функцию resolve обещания, передавая объект изображения.
    };

    // Устанавливаем обработчик события "onerror", который вызовется, если возникнет ошибка при загрузке изображения.
    image.onerror = () => {
      reject(new Error('Не удалось загрузить изображение')); // Вызываем функцию reject обещания с сообщением об ошибке.
    };

    // Устанавливаем исходное значение атрибута "src" объекта Image, что инициирует начало загрузки изображения.
    image.src = url;
  });
}