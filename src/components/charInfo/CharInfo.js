import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

import PropTypes from 'prop-types';

class CharInfo extends Component {

    state = {
        char: null,/* обязательно Null чтобы появился Skeleton */
        loading: false,/*  Это свойство дял спиннера в этом компоненте он выключени потому что по умолчанию там стоит заглущка */
        error: false/* это чтобы сайт не ломался если у нас загружен персонаж которого нет */
        /* name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null */
    }/* эти данные мы будем получать с сервера и с помощью них 
    показывать героя на странице */

    marvelService = new MarvelService();
    /* создаем экземпляр класса тут будет храниться потом класса */

    componentDidMount() {
        /* хук жизненного циклакомпонента который говорит чта наш компонент отрендерился
         */
        this.updateChar();
    }

    componentDidUpdate(prevProps) /* и перд пропсы пред состояние  */{
        /* хук жизненного циклакомпонента который говорит чта наш компонент обновился */
        /* this.updateChar(); так делать нельзя так ак после клика у нас будет запускаться обновление и оно будет бесконечно*/
        if (this.props.charId !== prevProps.charId) { /* это делать всегда обязательно! */
            /* если текущие пропсы не равны предыдущим то мы запускаем обновление по клику
            и если пользователь будет кликать по одному и то му же персонажу то ничего не произойдет */
            this.updateChar();
        }
    }

    
    /* если где выпадет ошибка то данный метод поможет продолжить работу приложения */
    
    updateChar = () => {
        /* по клику будет формировать нашего персонажа */
        const {charId} = this.props;/* 4(37) вытаскиваем charId из пропсов которые мы передали в app */
        if (!charId) {
            return;
        }/* если id нету, то ничего не вернется в итоге */
        this.onCharLoading();/* показываем спиннер перед запросом */
        this.marvelService
        .getCharacter(charId)/* берем id из app */
        .then(this.onCharLoaded)/* записываем в состояние */
        .catch(this.onError);/* вызываем функцию для формирования одно персонажа по Id */
    
        /* this.foo.bar = 0;  это специально чтобы сделать ошибку!!!*/
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char, 
            loading: false
        });/* на его местоприходит обект который будет записываться в state из*/
    }/* как только стейт измениться он изменит за собой и наш char */

    onCharLoading = () => {
        this.setState(
            {
                loading: true
            }
        )
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });/* изменяем наш state ошибки на true что бы показать пользователю это ошибку */
    }   

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : < Skeleton />;
        /* если чтото из этого есть мы ничего не рендирим, а если есть то мы загураеж skeleton Заглушку */
        const errorMessage = error ? <ErrorMessage /> : null;/* если ошибка есть */
        const spinner = loading ? <Spinner /> : null;/* если загрузка */        
        const content = !(loading || error || !char) ? <View char={char} /* checkImg={checkImg} *//> : null;
        /* если нет загрузки(false превратиться в тру) или нет ошибки или  есть char  возврахаем view */       
        /* if (loading) dвозвращаем если загрузка это условный рендеринг  */
         /*    return <Spinner/> */
        
        /* {loading ? <Spinner/> : <View char={char}/>} */


    return (
        <div className="char__info">
                {skeleton}   
                {errorMessage}
                {spinner}
                {content}
        </div>
    )
}
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    const _notAvailable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    let checkImg = char.thumbnail === _notAvailable;  
    const comicsLen = comics.length >= 10;    
    let check = comicsLen ?  10 : comics.length; /* с помощью этой переменной мы проверяем какая длинна списка комиксив */
    return (
        <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} style={{ objectFit: checkImg ? 'contain' : 'cover' }}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
               {comics.length > 1 ? 
                comics.slice(0, check).map((item, i) => {
                    /* обрезаем массив до 10 до перебора map */
                    /* if (i > 10) return еще один способ чтобы ограничить до только 10 комиксов
                    наш Map просто остановиться и вернет все что есть */
                    return (                        
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                        
                    )
                }) : 'Sorry, there is no tracks about these character/group comics list.'}            
            </ul>{/* перебираем список комиксов и выводим не забываем key сделать это обязательный параметр */}
        </>
    )
}

CharInfo.propTypes = {
    /* можно ли с помощью propTypes устанавливать значение по умолчанию
    ответ ДА */
    charId: PropTypes.number /* char id обязательно должен быть числом */
    /* если id будет являться чем то другим то выпадет ошибка */
}

CharInfo.defaultProps = { /* устанавляваем значение по умочанию если props yt gthtlfy*/
    /* можно ли с помощью propTypes устанавливать значение по умолчанию
    ответ ДА */
    charId: 10 /* char id обязательно должен быть числом */
     
}

/* или так */
/* static defaultProps = {
    charId: 10
} */

export default CharInfo;