import React, {useEffect, useState} from "react";
import Auth from "../components/Auth";
import Back from "../components/Back";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {deleteUrl, getAuthUrl, getToken} from "../action/authActions";
import {backView} from "../action/backActions";

//функция проверки наличия токена в локальном хранилище
export function checkToken() {
    const token = localStorage.getItem('token');
    if (token === null) {
        return false;
    } else {
        return true
    }
}

const Header = () => {
    console.log(checkToken())
    const url = useSelector(state => state.auth.url);
    const errorMessage = useSelector(state => state.token.errorMessage);
    //состояние кнопки "назад"
    const back = useSelector(state => state.interaction.back);
    //забираем код авторизации из адресной строки
    const code = window.location.search.split('code=')[1];

    const [textLink, setTextLink] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    //функции изменения состояния кнопки авторизации
    function authOn() { //авторизация есть
        dispatch(deleteUrl());
        setTextLink('Выйти');
    }
    function authOff() { //авторизации нет
        dispatch(getAuthUrl());
        setTextLink('Авторизация')
    }
    //эффект при первом рендере
    useEffect(() => {
        if (checkToken()) {
            authOn();
        } else {
            authOff();
        }
    }, []);
    //следим за изменением в адресной строке
    useEffect(() => {
        if (code && !checkToken()) {
            dispatch(getToken(code));
            authOn();
        }
    }, [code])
    //обработчик нажатия "назад"
    const handleClick = () => {
        history.goBack();
        dispatch(backView(false));
    };
    //обработчик отмены авторизации
    const handleClickOut = () => {
        localStorage.removeItem('token');
        authOff();
        history.push('/');
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Back back={back} handleBackClick={handleClick}/>
                    {errorMessage && <div>Ошибка получения токена авторизации</div>}
                    <Auth url={url} text={textLink} handle={handleClickOut}/>
                </div>
            </div>
        </header>
    )
}

export default Header;