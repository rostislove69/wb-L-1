// Задача на классы и наследование: создайте базовый класс Shape (фигура), 
// который имеет методы для расчета площади и периметра. 
// Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, 
// круг и треугольник. Реализуйте методы расчета площади и периметра для каждой фигуры.

class Shape {
  // Метод для вычисления площади фигуры. В базовом классе возвращает 0, который будет переопределен в дочерних классах.
  area() {
    return 0;
  }

  // Метод для вычисления периметра фигуры. В базовом классе возвращает 0, который будет переопределен в дочерних классах.
  perimeter() {
    return 0;
  }
}

// Создаем класс Rectangle, который наследует от базового класса Shape.
class Rectangle extends Shape {
  constructor(width, height) {
    super(); // Вызываем конструктор базового класса.
    this.width = width;
    this.height = height;
  }

  // Переопределяем метод area для вычисления площади прямоугольника.
  area() {
    return this.width * this.height;
  }

  // Переопределяем метод perimeter для вычисления периметра прямоугольника.
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

// Создаем класс Circle, который также наследует от базового класса Shape.
class Circle extends Shape {
  constructor(radius) {
    super(); // Вызываем конструктор базового класса.
    this.radius = radius;
  }

  // Переопределяем метод area для вычисления площади круга.
  area() {
    return Math.PI * this.radius ** 2;
  }

  // Переопределяем метод perimeter для вычисления периметра круга.
  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

// Создаем класс Triangle, также наследующий от базового класса Shape.
class Triangle extends Shape {
  constructor(side1, side2, side3) {
    super(); // Вызываем конструктор базового класса.
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  // Переопределяем метод area для вычисления площади треугольника по формуле Герона.
  area() {
    const a = this.side1;
    const b = this.side2;
    const c = this.side3;
    const p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
  }

  // Переопределяем метод perimeter для вычисления периметра треугольника.
  perimeter() {
    return this.side1 + this.side2 + this.side3;
  }
}

