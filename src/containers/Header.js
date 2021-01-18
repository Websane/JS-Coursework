import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import Auth from "../components/Auth";
import Back from "../components/Back";

import {getAuthUrl} from "../action/authActions";
import {backView} from "../action/backActions";
import {tokenDel} from "../action/tokenActions";
import {userDel} from "../action/userActions";

const Header = () => {
    const url = useSelector(state => state.auth.url);

    const tokenStatus = useSelector(state => state.token.status);

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
    }, [dispatch])
    //следим за статусом токена и юзера
    useEffect(() => {
        if (tokenStatus === 'success' && userStatus === 'success') {
            setTextLink('Выход');
        } else {
            setTextLink('Войти');
        }
    }, [tokenStatus, userStatus]);

    //обработчик нажатия "назад"
    const handleClick = () => {
        history.goBack();
        dispatch(backView(false));
    };
    //обработчик отмены авторизации
    const handleClickOut = () => {
        localStorage.removeItem('token');
        dispatch(tokenDel());
        dispatch(userDel());
        setUser('Войдите, чтобы авторизоваться');
        history.push('/');
    }
    //отменяем фокус при клике
    const handleMouseDown = (ev) => {
        ev.preventDefault();
    }

useEffect(() => {
     if (userStatus === 'success') {
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
                <Back back={back} handleBackClick={handleClick} handleMouseDown={handleMouseDown}/>
                <span className="header__logo">relax view</span>
                <div className="header__right">
                    <div className="header__user">{user}</div>
                    <Auth url={url} text={textLink} handle={handleClickOut}/>
                </div>
            </div>
        </header>

    )
}

export default Header;