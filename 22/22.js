// Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат.
// Максимальное число вызовов document.write() ограничено размером коллстэка.

let counter = 0;

function docWriteCall(){
  counter++;
  document.write();
  docWriteCall();
}

try {
  docWriteCall()
} catch (error) {
  console.log(`Максимальное количество вызовов documnet.write(): ${counter}`);
}