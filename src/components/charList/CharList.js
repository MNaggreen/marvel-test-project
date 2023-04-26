import './charList.scss';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
/* импортируем проверку */


class CharList extends Component {    
    state = {
        charList: [],/* почемуто это список? */
        loading: true,/*  Это свойство дял спиннера */
        error: false/* это чтобы сайт не ломался если у нас загружен персонаж которого нет */
        /* name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null */,
        newItemLoading: false,/* это для того чтобы сообщить кнопке что пресонажи загружаются */
        offset: 210, /* это у нас число для вставки в строку запроса 9 персонажей */
        charEnded: false /* это для определения закончились ли у нас персонажи если да */
    }/* эти данные мы будем получать с сервера и с помощью них 
    показывать героя на странице */

    marvelService = new MarvelService();
    /* создаем экземпляр класса тут будет храниться потом класса */   

    /* любые обращения к серверу можно делать только после создания компонент что мы сделали выше */
    componentDidMount() { /* это хуки */
        this.onRequest();/* в первый раз эта функция вызовется без аргумента
        аргументом по умолчанию выступит _baseOffset 210 */
        
        /* this.marvelService.getAllCharacters()    
            .then(this.onCharListLoaded) */
        /* !!!запускаем создание или обновление копонента после его непосредственно рендера !!!*/
            /* .catch(this.onError)
        console.log('mount'); */ /* 3 записался */       
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        /* метод который будет срабатывать после нажатия на кнопку подгрузить ещё персонажей */
        this.marvelService.getAllCharacters(offset)  
             .then(this.onCharListLoaded) /* после успешной загрузки сообщаем и запускаем функцию onCharListLoaded с загруженными персонажеми */
            /* !!!запускаем создание или обновление копонента после его непосредственно рендера !!!*/
            .catch(this.onError)
    }

    onCharListLoading = () => {/* на это состояние будет оринтироваться наша кнопка */
        /* это для того чтобы показать что мы загружаем новых персонажей */
        this.setState({            
            newItemLoading: true
        })
    }


    onCharListLoaded = (newCharList) => {/* из этйо функции мы вернем объект */ /* она запуститься ка только мы получим список */
        /* обновляем стейт по запросу componentDidMount */
        let ended = false;
        if (newCharList.length < 9) {
            ended = true; /* проверяем есть ли в массиве персонажи если нет то тогда больше не добавляем */
        }
        this.setState(({offset, charList}) => ({/* страый список персонажей */
            charList: [...charList, ...newCharList],/* прибавляем к уже имеющемуся списиску персонажей еще 9 персонажей */
            loading: false,
            newItemLoading: false, /* когда наш лист персонажей загрузиться то переключаем обратно на false */
            offset: offset + 9, /* прибавляем чтобы еще раз загрузить 9 персонажей */
            charEnded: ended /* помещаем в state наше значение */

        }));
        /* console.log(this.charList, 'CharList') */
    }
  

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });/* изменяем наш state ошибки на true что бы показать пользователю это ошибку */
    }   
    

    /* updateCharsButton = () => {        
        this.marvelService
        .getAllCharacters() */ /* вызываем функцию с заготовленным id */
        /* .then(this.onCharsLoaded) */ /* аргумент автомотически подставляеться когда мы используем tehn */
        /* .catch(this.onError)   */      
        /* если выпадет ошибка то вызовется метод который покаже сообщение */
        /* this.setState({ error: false })

    }    */
    AllChars(arr) {      
        /* это функция которая примет готовый СПИСОК с персонадами */
            const items = arr.map(item => {
            const _notAvailable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            let checkImg = item.thumbnail === _notAvailable;  
                    return (                       
                            <li className="char__item"
                            key={item.id} 
                            onClick={() => this.props.onCharSelected(item.id)}> 
                            {/* незабываем назначать ключ! */}
                            {/* 1(37) шаг передаем функции в app.js текущий id по клику*/}
                                <img 
                                src={item.thumbnail} 
                                alt={item.name} 
                                style={{ objectFit: checkImg ? 'contain' : 'cover' }}/>
                        <div className="char__name">{item.name}</div>
                            </li>                        
                            )        
                    }) 
            
            // А эта конструкция вынесена для центровки спиннера/ошибки     
            return (
                <ul className="char__grid">
                    {items}
                </ul>
            )      
            
    }

    render() {
        /* console.log('render') */ /* 2 компонент создался и готов к отображению */
        
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;/* вытаскиваем из свойства char все его сущности */
        
        const items = this.AllChars(charList);
        /* запускаем нашу функцию */
        const errorMessage = error ? <ErrorMessage /> : null;/* если ошибка есть */
        const spinner = loading ? <Spinner /> : null;/* если загрузка */
        const content = !(loading || error) ? items : null        
       
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}/*  кнопка просто исчезнет колгда элементы закончатся */
                onClick={() => this.onRequest(offset)}/* передаем наш текущий offset */
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }  
   
     
}



export default CharList;
/* вот это он создаст */
 /* <div className="char__list">
            <ul className="char__grid">
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div> */