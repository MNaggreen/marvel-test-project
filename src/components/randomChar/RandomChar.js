import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
/* import thor from '../../resources/img/thor.jpeg'; старая картинка для превью*/
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {
    /* constructor(props) {
        super(props);
        console.log('constructor') */ /* 1 компонент создается */
        /* this.updateChar(); */
        /* вызываем через конструктор нашу функци
        в момент конструирования state */
        /* это плохая практика так делать нельзя */
        
    /* } *//* жизненный цикл компонента
    1 componentDidMount() появился на странице
    2 componentDidUpdate() компонент обновился (новое свойстов или изменен стайте)
    3 componentWillUnmount() компонент удален (но иногда после удаления компонент интервал назначенный а его изменение может
        все также запускаться) 
        3.1componentDidCatch() оошибка компонента*/
    
    state = {
        char: {},
        loading: true,/*  Это свойство дял спиннера */
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

    /* любые обращения к серверу можно делать только после создания компонент что мы сделали выше */
    componentDidMount() { /* это хуки */
        this.updateChar();
        /* !!!запускаем создание или обновление копонента после его непосредственно рендера !!!*/
       /*  console.log('mount'); */ /* 3 записался */
        /* this.timerID = setInterval( this.updateChar(), 3000) каждые три секунды интервал будет запускать нащу функцию */
    }

    componentWillUnmount() {/* это хуки */
        /* console.log('unmount'); */
        /* clearInterval( this.timerID) каждые три секунды интервал будет запускать нащу функцию */
         /*4 убрался при нажатии на конопку выключения или удаления компонента  */
    }/* тут мы можем очищать интервал ктак ак компонет закрыт */

 /* 
 !!!!!
 если мы добовляем какой нибудь event listener то потом мы должны его удалить
 при переходе на другую страницу или просто при удалении его же
 removeEventListener
 !!!*/

    onCharLoaded = (char) => {
        this.setState({
            char: char, 
            loading: false
        });/* на его местоприходит обект который будет записываться в state */
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

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);/* целые числа (рандомное число * минимальный номер - максимальный) + минамальное значение*/
        /* временное id */ /* в работе с любым api мы должны ументь правильно обращаться к серверу
        и с этим нам должен помочь backend */
        this.onCharLoading() /* запускаем данный метод чтобы показать загрузка во время нажатии кнопки try it */
        this.marvelService
        .getCharacter(id) /* вызываем функцию с заготовленным id */
        .then(this.onCharLoaded)/* аргумент автомотически подставляеться когда мы используем tehn */
        .catch(this.onError)        
        /* если выпадет ошибка то вызовется метод который покаже сообщение */
    }


    updateCharButton = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);/* целые числа (рандомное число * минимальный номер - максимальный) + минамальное значение*/
        /* временное id */ /* в работе с любым api мы должны ументь правильно обращаться к серверу
        и с этим нам должен помочь backend */   
        this.onCharLoading() /* запускаем данный метод чтобы показать загрузка во время нажатии кнопки try it */    
        this.marvelService
        .getCharacter(id) /* вызываем функцию с заготовленным id */
        .then(this.onCharLoaded)/* аргумент автомотически подставляеться когда мы используем tehn */
        .catch(this.onError)        
        /* если выпадет ошибка то вызовется метод который покаже сообщение */
        this.setState({ error: false })
    }   

    render() {
        /* console.log('render') */ /* 2 компонент создался и готов к отображению */
        const {char, loading, error} = this.state;/* вытаскиваем из свойства char все его сущности */
        const errorMessage = error ? <ErrorMessage /> : null;/* если ошибка есть */
        const spinner = loading ? <Spinner /> : null;/* если загрузка */        
        const content = !(loading || error) ? <View char={char} /* checkImg={checkImg} *//> : null;
        /* если нет загрузки или нет ошибки возврахаем view */       
        /* if (loading) dвозвращаем если загрузка это условный рендеринг  */
         /*    return <Spinner/> */
        
        /* {loading ? <Spinner/> : <View char={char}/>} */
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                {/* если у нас loading true то отображаем спиннер если нет отображаем наш блок с героем те передаем значение в локльный компонент*/}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateCharButton} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }   
}

const View = ({char}) => {
    /* простой компонент который отображает только без запросов и тд */
    const {name, description, thumbnail, homepage, wiki} = char;
    /* console.log(thumbnail) */
    const _notAvailable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const checkImg = thumbnail === _notAvailable;    
    /* console.log(checkImg);
    console.log(_notAvailable); */
    
    return (
            <div className="randomchar__block">
                <img src={thumbnail} style={{ objectFit: checkImg ? 'contain' : 'cover' }} alt="Random character" className="randomchar__img"/>
                {/* меняем objectFit на contain если у нас подгрузилась какртина not found!!!! */}
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
 )
}


export default RandomChar;