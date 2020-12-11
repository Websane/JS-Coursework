import React, {useEffect, useState} from "react";
import Auth from "../components/Auth";
import Back from "../components/Back";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getAuthUrl} from "../action/authActions";
import {backView} from "../action/backActions";
import {getToken, tokenDel} from "../action/tokenActions";

//функция проверки наличия токена в локальном хранилище
export function checkToken() {
    const token = localStorage.getItem('token');
    if (token === null) {
        return false;
    } else {
        return true
    }
}

// const Header = () => {
//     const url = useSelector(state => state.auth.url);
//     const errorMessage = useSelector(state => state.token.errorMessage);
//     //состояние кнопки "назад"
//     const back = useSelector(state => state.interaction.back);
//     //забираем код авторизации из адресной строки
//     const code = window.location.search.split('code=')[1];
//
//     const [textLink, setTextLink] = useState('');
//     const dispatch = useDispatch();
//     const history = useHistory();
//
//     //эффект при первом рендере
//     useEffect(() => {
//         dispatch(getAuthUrl());
//         if (checkToken()) {
//             setTextLink('Выйти');
//         } else {
//             setTextLink('Авторизация')
//         }
//     }, []);
//     //следим за изменением в адресной строке
//     useEffect(() => {
//         if (code && !checkToken()) {
//             dispatch(getToken(code));
//             setTextLink('Выйти');
//         }
//     }, [code])
//     //обработчик нажатия "назад"
//     const handleClick = () => {
//         history.goBack();
//         dispatch(backView(false));
//     };
//     //обработчик отмены авторизации
//     const handleClickOut = () => {
//         localStorage.removeItem('token');
//         setTextLink('Авторизация');
//         document.querySelectorAll('.likeOn').forEach(el => el.classList.remove('likeOn')); // -_-
//         history.push('/');
//     }
//
//     return (
//         <header className="header">
//             <div className="container">
//                 <div className="header__content">
//                     <Back back={back} handleBackClick={handleClick}/>
//                     {errorMessage && <div>{errorMessage}</div>}
//                     <Auth url={url} text={textLink} handle={handleClickOut}/>
//                 </div>
//             </div>
//         </header>
//     )
// }
//
// export default Header;

const Header = () => {
    const url = useSelector(state => state.auth.url);
    const errorMessage = useSelector(state => state.token.errorMessage);
    const tokenStatus = useSelector(state => state.token.status);
    const code = window.location.search.split('code=')[1];
    //состояние кнопки "назад"
    const back = useSelector(state => state.interaction.back);

    const [textLink, setTextLink] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAuthUrl());
        if (tokenStatus === 'success') {
            setTextLink('Выйти');
        } else if (tokenStatus === 'loading') {
            setTextLink('Загрузка...');
        } else {
            setTextLink('Авторизация');
        }
    }, [tokenStatus]);

    // useEffect(() => {
    //     if (code && tokenStatus !== 'success') {
    //     dispatch(getToken(code));
    //     }
    // }, [code, tokenStatus])

    //обработчик нажатия "назад"
    const handleClick = () => {
        history.goBack();
        dispatch(backView(false));
    };
    //обработчик отмены авторизации
    const handleClickOut = () => {
        localStorage.removeItem('token');
        dispatch(tokenDel());
        // document.querySelectorAll('.likeOn').forEach(el => el.classList.remove('likeOn')); // -_-
        history.push('/');
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Back back={back} handleBackClick={handleClick}/>
                    {errorMessage && <div>{errorMessage}</div>}
                    <Auth url={url} text={textLink} handle={handleClickOut}/>
                </div>
            </div>
        </header>
    )
}

export default Header;