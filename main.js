import { pokemons } from './pokemons.js';
import Pokemon from './pokemon.js';

// Логи боя
const addLog = (message) => {
    const logs = document.getElementById('logs');
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logs.prepend(logEntry);
};

// Инициализация покемонов
const pikachuData = pokemons[0]; // Pikachu из массива pokemons
const charmanderData = pokemons[1]; // Charmander из массива pokemons

// Создание объектов покемонов
const pikachu = new Pokemon(pikachuData, document.getElementById('health1'), document.getElementById('attack1'), addLog);
const charmander = new Pokemon(charmanderData, document.getElementById('health2'), document.getElementById('attack2'), addLog);

// Установка врагов
pikachu.enemy = charmander;
charmander.enemy = pikachu;

// Отображение информации о покемонах
document.getElementById('name1').textContent = pikachuData.name;
document.getElementById('img1').src = pikachuData.img;
document.getElementById('name2').textContent = charmanderData.name;
document.getElementById('img2').src = charmanderData.img;

// Обработчики для кнопок атаки
document.getElementById('attack1-button').addEventListener('click', () => {
    const attackName = document.getElementById('attack1').value;
    pikachu.battle(attackName);
});

document.getElementById('attack2-button').addEventListener('click', () => {
    const attackName = document.getElementById('attack2').value;
    charmander.battle(attackName);
});
