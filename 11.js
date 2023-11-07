// Задача о замыканиях и области видимости: напишите функцию, 
// которая возвращает другую функцию. Внутренняя функция должна иметь доступ к переменной, 
// определенной во внешней функции, даже после того, как внешняя функция завершила свое выполнение.

function a() {
  // Внутри функции a объявляем переменную b и присваиваем ей значение "Я переменная".
  const b = "Я переменная";

  // Внутри функции a также объявляем функцию c.
  function c() {
    // Функция c выводит значение переменной b в консоль.
    console.log(b);
  }

  // Возвращаем функцию c из функции a. Функция c сохраняет доступ к переменной b благодаря замыканию.
  return c;
}

// Вызываем функцию a и сохраняем её возвращаемое значение (функцию c) в переменной d.
const d = a();

// Затем обнуляем переменную a. Это не влияет на функцию, которая была сохранена в d.
a = null;

// Вызываем функцию, сохраненную в d. Функция c внутри функции a по-прежнему имеет доступ к переменной b и выводит её значение.
d();