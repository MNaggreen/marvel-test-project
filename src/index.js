import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelService from './services/MarvelService';
/* импорт нашего компонента */
import './style/style.scss';

/* const marvelService = new MarvelService(); */
/* создаем экземпляр класса тут будет храниться потом класса */
 
/* marvelService.getAllCharacters().then(res => console.log(res)); */
/* делаем запрос и когда он выполниться консоль выведет списко персонажей */
/* сейчас консоль выведет лимит в 20 персонажей т.е. вернется объект в котором будет 20 персонажей
лимит можно увеличить или уменьшить в костуроре на сайте где мы брали ссылку для запроса
далее берем ссылку с нашими новыми url параметрами */

/* marvelService.getCharacter(1011196).then(res => console.log(res)); */
/* выводим только одно персонажа id у нас взят вручную с сайта */

/* marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name))); */
/* берем результат и захадим в data далее results и там каждого персонажа перебираем
и выводим только его имя это мы делаем чтобы избавиться от ненужной информации*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

