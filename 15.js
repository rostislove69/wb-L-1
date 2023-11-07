// Задача на асинхронность: напишите асинхронную функцию, 
// которая использует ключевое слово await для ожидания выполнения других асинхронных операций, 
// и возвращает результат выполнения.

async function exampleAsyncFunction() {
    try {
        // Ожидаем выполнение асинхронной операции, например, запроса к API.
        const result1 = await someAsyncOperation1();

        // Ожидаем выполнение другой асинхронной операции.
        const result2 = await someAsyncOperation2();

        // Выполняем дополнительные операции с результатами.
        const finalResult = result1 + result2;

        return finalResult;
    } catch (error) {
        // Обрабатываем ошибки, если они возникнут во время асинхронных операций.
        throw error;
    }
}