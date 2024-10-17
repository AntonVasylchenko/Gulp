// Змінні
const greeting = "Привіт, світе!";
let count = 0;

// Функція для виведення привітання
function greet() {
    console.log(greeting);
}

// Виклик функції
greet();

// Функція для підрахунку
function incrementCounter() {
    count++;
    console.log(`Лічильник: ${count}`);
}

// Виклик функції кілька разів
incrementCounter(); // Лічильник: 1
incrementCounter(); // Лічильник: 2
// Масив з іменами
const names = ["Антон", "Олена", "Іван", "Марія"];

// Цикл для виведення імен
for (let i = 0; i < names.length; i++) {
    console.log(`Привіт, ${names[i]}!`);
}
// Об'єкт з даними користувача
const user = {
    name: "Антон",
    age: 27,
    occupation: "Розробник",
    greet: function () {
        console.log(`Привіт, я ${this.name}, мені ${this.age} років.`);
    }
};

// Виклик методу об'єкта
user.greet(); // Привіт, я Антон, мені 27 років.
// Функція для фільтрації чисел
function filterNumbers(numbers, callback) {
    const result = [];
    for (let number of numbers) {
        if (callback(number)) {
            result.push(number);
        }
    }
    return result;
}

// Використання функції для фільтрації парних чисел
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterNumbers(numbers, (num) => num % 2 === 0);
console.log(`Парні числа: ${evenNumbers}`); // Парні числа: 2,4,6
// Обробка подій для кнопки
const button = document.createElement('button');
button.innerText = 'Натисни на мене';
document.body.appendChild(button);

button.addEventListener('click', () => {
    alert('Кнопка натиснута!');
});
