// Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице 
// и выполняет определенные действия с этими данными, например, отправляет их на сервер 
// или отображает всплывающее окно с результатами.

function processDataFromForm(formSelector, inputSelector) {
  // Получаем форму по её селектору
  const form = document.querySelector(formSelector);

  // Получаем массив инпутов из формы
  const inputs = Array.from(form.querySelectorAll(inputSelector));

  // Выполняем действия с данными из полей формы
  inputs.forEach(input => {
    console.log(`${input.type}: ${input.value}`);
  })

  // Очищаем форму после обработки данных
  form.reset();
}