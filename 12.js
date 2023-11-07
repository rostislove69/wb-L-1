// Задача на работу с объектами: создайте объект, представляющий собой книгу. 
// Объект должен иметь свойства, такие как: название книги, автор и год издания. 
// Напишите методы для получения и изменения значений свойств книги.


// Использование литерала объекта
const firstBook = {
  title: "Программирование на JavaScript",
  author: "Иван Иванов",
  year: 2023,

  // Метод для получения названия книги
  getTitle: function() {
    return this.title;
  },

  // Метод для получения автора книги
  getAuthor: function() {
    return this.author;
  },

  // Метод для получения года издания книги
  getYear: function() {
    return this.year;
  },

  // Метод для изменения названия книги
  setTitle: function(newTitle) {
    this.title = newTitle;
  },

  // Метод для изменения автора книги
  setAuthor: function(newAuthor) {
    this.author = newAuthor;
  },

  // Метод для изменения года издания книги
  setYear: function(newYear) {
    this.year = newYear;
  }
};

// Использоавние класса
class ClassBook {
  constructor(title, author, year){
    this.titel = title;
    this.author = author;
    this.year = year;
  }

  // Метод для получения названия книги
  getTitle() {
    return this.title;
  }

  // Метод для получения автора книги
  getAuthor() {
    return this.author;
  }

  // Метод для получения года издания книги
  getYear() {
    return this.year;
  }

  // Метод для изменения названия книги
  setTitle(newTitle) {
    this.title = newTitle;
  }

  // Метод для изменения автора книги
  setAuthor(newAuthor) {
    this.author = newAuthor;
  }

  // Метод для изменения года издания книги
  setYear(newYear) {
    this.year = newYear;
  }
}

const secondBook = new ClassBook("Программирование на JavaScript", "Иван Иванов", 2023);

// Использование конструктора объекта
function constructorBook(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;

  this.getTitle = function() {
    return this.title;
  };

  this.getAuthor = function() {
    return this.author;
  };

  this.getYear = function() {
    return this.year;
  };

  this.setTitle = function(newTitle) {
    this.title = newTitle;
  };

  this.setAuthor = function(newAuthor) {
    this.author = newAuthor;
  };

  this.setYear = function(newYear) {
    this.year = newYear;
  };
}

const thirdBook = new constructorBook("Программирование на JavaScript", "Иван Иванов", 2022);

// Использование фабричной функции
function createBook(title, author, year) {
  return {
    title: title,
    author: author,
    year: year,
    getTitle: function() {
      return this.title;
    },
    getAuthor: function() {
      return this.author;
    },
    getYear: function() {
      return this.year;
    },
    setTitle: function(newTitle) {
      this.title = newTitle;
    },
    setAuthor: function(newAuthor) {
      this.author = newAuthor;
    },
    setYear: function(newYear) {
      this.year = newYear;
    },
  };
}

const fourthBook = createBook("Программирование на JavaScript", "Иван Иванов", 2022);
