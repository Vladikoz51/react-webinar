import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store.js';
import App from './app.js';

const root = document.getElementById("app");

console.log('index.js');

// Состояние приложения
const store = new Store({
  items: [
    {code: 1, title: 'Торт "Лакомка"', price: 600},
    {code: 2, title: 'Торт "Наполеон"', price: 800},
    {code: 3, title: 'Кекс "Шахматный"', price: 300},
    {code: 4, title: 'Торт "Медовый"', price: 700},
    {code: 5, title: 'Кекс с изюмом', price: 350},
    {code: 6, title: 'Торт "Прага"', price: 1000},
    {code: 7, title: 'Торт "Ежик"', price: 400}
  ],
  cart: []
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, root);
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(<App store={store}/>, root);
