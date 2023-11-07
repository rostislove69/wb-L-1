// Разработайте страницу, отображающую таблицу с данными.
// Требования:
// • данные должны загружаться при загрузке страницы
// • необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// • необходимо реализовать клиентскую пагинацию (50 элементов на странице)


// Получаем ссылки на элементы таблицы, тела таблицы и пагинации
const table = document.getElementById("data-table");
const tbody = document.getElementById("data-body");
const pagination = document.getElementById("pagination");

// Устанавливаем количество элементов данных, отображаемых на одной странице
const itemsPerPage = 50;

// Определяем текущую активную страницу
let currentPage = 1;

// Создаем пустой массив для хранения данных
let data = [];

// Функция для загрузки данных из удаленного источника
function loadData() {
  // URL для загрузки данных
  const url = "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true";
  
  // Используем fetch для загрузки данных
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(res => {
      // Сохраняем загруженные данные
      data = res;
      // Заполняем таблицу данными
      populateTable(res);
      // Обновляем пагинацию
      updatePagination();
    })
    .catch(error => {
      console.error("Ошибка при загрузке данных:", error);
    });
}

// Функция для заполнения таблицы данными на основе текущей страницы
function populateTable(data) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  // Очищаем тело таблицы
  tbody.innerHTML = "";

  // Создаем строки таблицы и заполняем их данными
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${data[i].fname}</td>
        <td>${data[i].lname}</td>
        <td>${data[i].tel}</td>
        <td>${data[i].address}</td>
        <td>${data[i].city}</td>
        <td>${data[i].state}</td>
        <td>${data[i].zip}</td>
    `;
    tbody.appendChild(row);
  }
}

// Функция для обновления пагинации
function updatePagination() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  pagination.innerHTML = "";

  // Создаем ссылки на разные страницы и назначаем им обработчики событий
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.textContent = i;
    pageLink.onclick = () => {
      currentPage = i;
      // Перерисовываем таблицу и обновляем пагинацию при выборе страницы
      populateTable(data);
      updatePagination();
    };
    pagination.appendChild(pageLink);
  }
}

// Объект для отслеживания порядка сортировки столбцов
const sortOrder = {};

// Функция для сортировки таблицы по заданному столбцу
function sortTable(columnIndex) {
  const columnKey = Object.keys(data[0])[columnIndex];

  if (!sortOrder[columnKey] || sortOrder[columnKey] === "asc") {
    data.sort((a, b) => {
      const columnA = a[columnKey];
      const columnB = b[columnKey];
      if (columnA < columnB) {
        return -1;
      }
      if (columnA > columnB) {
        return 1;
      }
      return 0;
    });
    sortOrder[columnKey] = "desc";
  } else {
    data.sort((a, b) => {
      const columnA = a[columnKey];
      const columnB = b[columnKey];
      if (columnA > columnB) {
        return -1;
      }
      if (columnA < columnB) {
        return 1;
      }
      return 0;
    });
    sortOrder[columnKey] = "asc";
  }

  // Перерисовываем таблицу и обновляем пагинацию после сортировки
  populateTable(data);
  updatePagination();
}

// Получаем ссылки на заголовки столбцов таблицы
const tableHeaders = Array.from(document.querySelectorAll(".table-header"));

// Назначаем обработчики событий для сортировки по столбцам
tableHeaders.forEach((item, index) => {
  item.addEventListener("click", () => {
    sortTable(index);
  });
});

// Загружаем данные после загрузки страницы
document.addEventListener("DOMContentLoaded", loadData);
