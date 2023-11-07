// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

function checkLocalStorageQuota() {
  // Создаем объект savedData для временного хранения данных из localStorage
  let savedData = {};

  // Перебираем все ключи и значения в localStorage и сохраняем их в объект savedData
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    savedData[key] = value;
  }

  try {
    // Очищаем localStorage перед началом теста
    localStorage.clear();

    // Создаем строку testData, представляющую собой 1 КБ данных (1024 символа 'a')
    const testData = new Array(1024).join("a"); // 1 КБ данных

    // Запускаем цикл для добавления данных в localStorage
    for (let i = 0; i < 1000000; i++) {
      localStorage.setItem(`testKey${i}`, `${testData}`);
    }
  } catch {
    // Если возникло исключение (превышение квоты), переходим в блок catch

    // Оцениваем использованное хранилище в байтах
    const usedStore = localStorage.length * 1024;

    // Очищаем localStorage перед восстановлением данных
    localStorage.clear();

    // Восстанавливаем ранее сохраненные данные из объекта savedData
    for (const key in savedData) {
      localStorage.setItem(key, savedData[key]);
    }

    // Возвращаем оценку использованного хранилища
    return usedStore;
  }
}

// Вызываем функцию для оценки максимального объема данных в localStorage
const maxLocalStorageSize = checkLocalStorageQuota();

// Выводим результат в консоль
console.log(`Максимальный объем данных в localStorage: ${maxLocalStorageSize}`);
