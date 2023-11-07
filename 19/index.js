// Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много).
// Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки.
// При прокрутке содержимого виджета до конца должны подгружаться новые посты.
// Необходимо реализовать возможность кэширования уже загруженных данных:
// если пользователь закрыл страницу, а потом снова открыл ее,
// виджет должен отображать все загруженные ранее данные
// (новые данные должны подгружаться из учетом уже загруженных ранее).

document.addEventListener("DOMContentLoaded", function () {
  // Получаем элемент контейнера, куда будут добавляться посты.
  const container = document.getElementById("vk-wall-widget");
  let maxBytes = checkLocalStorageQuota();

  // Задаем некоторые начальные параметры, такие как идентификатор владельца группы, API-ключ и количество постов для загрузки.
  const ownerId = "-176864224";
  const apiKey =
    "7ddf1ff57ddf1ff57ddf1ff5837ec9330277ddf7ddf1ff5189bf6779fa9983e1643e57f";
  const postsPerLoad = 10;
  let offset = 0;
  let loading = false;

  // Попытка загрузить посты из localStorage (кеша).
  let cachedPosts = JSON.parse(localStorage.getItem("cachedPosts")) || [];

  if (cachedPosts !== null && cachedPosts.length > 0) {
    displayPosts(container, cachedPosts);
    console.log(calculateLocalStorageUsage());
    offset = cachedPosts.length;
  } else {
    fetchPostsFromAPI(offset);
  }

  // Функция для загрузки постов с использованием VK API.
  function fetchPostsFromAPI(offset) {
    if (loading) {
      return;
    }

    loading = true;

    // Выполняем GET-запрос к VK API, чтобы получить посты.
    fetch(
      `https://api.vk.com/method/wall.get?owner_id=${ownerId}&count=${postsPerLoad}&offset=${offset}&access_token=${apiKey}&v=5.131`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          const newPosts = data.response.items;

          if (newPosts.length > 0) {
            // Проверяем и управляем размером localStorage.
            checkLocalStorageSize(newPosts);

            // Добавляем новые посты к уже имеющимся в localStorage.
            let cachedPosts = JSON.parse(localStorage.getItem("cachedPosts")) || [];
            const updatedPosts = [...cachedPosts, ...newPosts];
            localStorage.setItem("cachedPosts", JSON.stringify(updatedPosts));
            console.log(calculateLocalStorageUsage());

            // Вызываем функцию для отображения постов.
            displayPosts(container, newPosts);
          }
        } else {
          console.error("Ошибка при загрузке данных с VK API");
        }

        loading = false;
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        loading = false;
      });
  }

  // Функция для отображения постов в контейнере.
  function displayPosts(container, posts) {
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      const groupName = document.createElement("div");
      groupName.classList.add("group-name");
      groupName.innerHTML = "Это не нервы, я мужчина-стерва.";
      postElement.appendChild(groupName);

      // Отображение даты поста.
      const postDate = document.createElement("div");
      postDate.classList.add("post-date");
      postDate.innerHTML = formatDate(post.date);
      postElement.appendChild(postDate);

      const postText = document.createElement("div");
      postText.classList.add("post-text");
      postText.innerHTML = post.text;
      postElement.appendChild(postText);

      // Отображение вложений (фото и видео) к посту.
      if (post.attachments) {
        post.attachments.forEach((attachment) => {
          if (attachment.type === "photo") {
            const photoArr = attachment.photo.sizes;
            const photoURL = photoArr[photoArr.length - 1].url;
            const photoElement = document.createElement("img");
            photoElement.classList.add("post-photo");
            photoElement.src = photoURL;
            postElement.appendChild(photoElement);
          } else if (attachment.type === "video") {
            const videoImgArr = attachment.video.image;
            const videoImageUrl = videoImgArr[videoImgArr.length - 1].url;
            const videoContainer = document.createElement("div");
            const videoElement = document.createElement("img");
            const videoTitle = document.createElement("p");
            videoContainer.classList.add("video-container");
            videoElement.classList.add("post-video");
            videoTitle.classList.add("video-title");
            videoElement.src = videoImageUrl;
            videoTitle.textContent = attachment.video.title;
            videoContainer.appendChild(videoElement);
            videoContainer.appendChild(videoTitle);
            postElement.appendChild(videoContainer);
          }
        });
      }

      // Добавляем пост в контейнер.
      container.appendChild(postElement);
    });
  }

  // Функция для форматирования даты.
  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("ru", options);
  }

  // Функции для управления использованием localStorage для кеширования данных.
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

  function calculateLocalStorageUsage() {
    let totalBytes = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage.getItem(key);
        totalBytes += value.length;
      }
    }

    const totalSizeInMB = (totalBytes / (1024 * 1024)).toFixed(2);
    const maxSizeInMB = (maxBytes / (1024 * 1024)).toFixed(2);

    return `Использовано ${totalSizeInMB} MB / ${maxSizeInMB} MB`;
  }

  function checkLocalStorageSize(newPosts) {
    let cachedPosts = JSON.parse(localStorage.getItem("cachedPosts")) || [];
    const updatedPosts = [...cachedPosts, ...newPosts];
    const updatedData = JSON.stringify(updatedPosts);

    // Проверка размера данных
    if (updatedData.length > maxBytes) {
      // Вычислите, сколько данных вы должны удалить
      let bytesToBeRemoved = updatedData.length - maxBytes;
      let removedData = [];

      while (bytesToBeRemoved > 0 && cachedPosts.length > 0) {
        const oldestData = JSON.stringify(cachedPosts.shift());
        removedData.push(oldestData);
        bytesToBeRemoved -= oldestData.length;
      }

      // Удаляем старые данные из localStorage
      removedData.forEach((data) => {
        const index = updatedPosts.findIndex(
          (post) => JSON.stringify(post) === data
        );
        if (index >= 0) {
          updatedPosts.splice(index, 1);
        }
      });

      // Обновляем данные в localStorage
      localStorage.setItem("cachedPosts", JSON.stringify(updatedPosts));

      // Повторно вычисляем размер использованного localStorage
      console.log(calculateLocalStorageUsage());
    }
  }

  // Обработчик скролла для подгрузки новых постов при прокрутке до конца элемента #vk-wall-widget
  container.addEventListener("scroll", function () {
    if (
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 100
    ) {
      offset += postsPerLoad;
      fetchPostsFromAPI(offset);
    }
  });
});
