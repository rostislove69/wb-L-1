// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), 
// подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.

// Функция debounce для отложенного выполнения функции
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Функция для выполнения геокодинга
function geocodeAddress(query, callback) {
  const apiKey = '20c4d322-1c4f-46ed-b43f-b127bae4cd2d';
  const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${encodeURIComponent(query)}`;

  // Отправляем запрос к API Яндекс.Карт
  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      // Извлекаем список адресов из ответа
      const results = data.response.GeoObjectCollection.featureMember.map(item => item.GeoObject.name);
      callback(results);
    })
    .catch(error => {
      console.error('Ошибка геокодинга:', error);
      callback([]); // В случае ошибки, передаем пустой список результатов
    });
}

// Получаем ссылки на элементы DOM
const addressInput = document.getElementById('addressInput');
const suggestionsList = document.getElementById('suggestions');

// Обработчик события ввода в поле адреса с применением debounce
addressInput.addEventListener('input', debounce(function () {
  const query = addressInput.value;
  if (query.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }

  // Выполняем геокодинг на основе введенного запроса
  geocodeAddress(query, function (results) {
    // Очищаем предыдущие результаты
    suggestionsList.innerHTML = '';

    // Выводим новые результаты
    results.forEach((result) => {
      const listItem = document.createElement('li');
      listItem.textContent = result;
      listItem.addEventListener('click', function () {
        addressInput.value = result;
        suggestionsList.style.display = 'none';
      });
      suggestionsList.appendChild(listItem);
    });

    suggestionsList.style.display = 'block';
  });
}, 300));

// Закрываем выпадающий список, если кликнули вне него
document.addEventListener('click', function (event) {
  if (event.target !== addressInput && event.target !== suggestionsList) {
    suggestionsList.style.display = 'none';
  }
});