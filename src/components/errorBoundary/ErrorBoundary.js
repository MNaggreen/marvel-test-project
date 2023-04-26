import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
class ErrorBoundary extends Component {
    /* это так называемая заглушака которой мы будет оборачивать определеные участки
    кода в случае исли они с ошибкой 
    место ошибки можно вывести какйото элемент заглушку
    
    ОН ЛОВИТ
    в методе render
    в методах жизненного цикла
    в конструкторах дочерних компонентав
    
    ОН НЕ ЛОВИТ
    ошибки которые произошли в обработчиках событий
    асинхронный код
    в самом предахранителе именно в самом */
    state = {
        error: false
    }

    /* static getDerivedStateFromError(error) 
    { */ /*данный метод аналог метода componentDidCatch но данный метод может только обновлять state */
        /* return {error: true}
    } */
    componentDidCatch(error, errorInfo) {
        /* при возникновении ошибки мы меняем наш стейт */
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            /* если компонент не работает из за ошибки */
            return <ErrorMessage/>
        }
        return this.props.children;/* это компонент который был передан в это компонент */
    }
}

export default ErrorBoundary;