import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import Auth from "../components/Auth";
import Back from "../components/Back";

import {getAuthUrl} from "../action/authActions";
import {backView} from "../action/backActions";
import {tokenDel} from "../action/tokenActions";

const Header = () => {
    const url = useSelector(state => state.auth.url);

    const tokenStatus = useSelector(state => state.token.status);
    const errorMessageToken = useSelector(state => state.token.errorMessage);

    const userStatus = useSelector(state => state.user.status);
    const userName = useSelector(state => state.user.name);
    const loading = useSelector(state => state.user.loading);
    //состояние кнопки "назад"
    const back = useSelector(state => state.interaction.back);

    const [textLink, setTextLink] = useState('');
    const [user, setUser] = useState('Войдите, чтобы авторизоваться');

    const dispatch = useDispatch();
    const history = useHistory();
    //один раз получаем url авторизации
    useEffect(() => {
        dispatch(getAuthUrl());
    }, [])
    //следим за статусом токена
    useEffect(() => {
        if (tokenStatus === 'success') {
            setTextLink('Выход');
        } else {
            setTextLink('Войти');
        }
    }, [tokenStatus]);

    //обработчик нажатия "назад"
    const handleClick = () => {
        history.goBack();
        dispatch(backView(false));
    };
    //обработчик отмены авторизации
    const handleClickOut = () => {
        localStorage.removeItem('token');
        dispatch(tokenDel());
        setUser('Войдите, чтобы авторизоваться');
        history.push('/');
    }


useEffect(() => {
     if (userStatus === 'success' && tokenStatus === 'success') {
        setUser(`Привет, ${userName}!`);
    } else if (userStatus === 'error') {
        setUser('Ошибка');
    } else if (loading) {
        setUser('Загрузка...');
    }
}, [userStatus, user, loading, userName])

    return (
        <header className="header">
            <div className="container header__container">
                <div className="header__content">
                    <Back back={back} handleBackClick={handleClick}/>
                    <h1 className="header__title">relax view</h1>
                    <div className="header__user">{user}</div>
                    <Auth url={url} text={textLink} handle={handleClickOut}/>
                </div>
            </div>
            {errorMessageToken && <div className="header__error">{errorMessageToken}</div>}
        </header>

    )
}

export default Header;