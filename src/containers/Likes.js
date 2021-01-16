import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {setLike, setLikes} from "../action/likeActions";

const Likes = ({ like, myLike, photoId }) => {
    const [valueLike, setValueLike] = useState(like);
    const [newMyLike, setNewMyLike] = useState(myLike);
    const [touched, setTouched] = useState(false);
    const tokenStatus = useSelector(state => state.token.status);

    const dispatch = useDispatch();
    //обработчик лайка
    const handleClick = () => {
        if (tokenStatus === 'success') {
            setValueLike(prev => newMyLike ? prev - 1 : prev + 1);
            setNewMyLike(prev => !prev);
            setTouched(true);
            dispatch(setLike(newMyLike, photoId));
        } else {
            setTouched(false);
            alert('Необходимо авторизоваться')
        }
    }
    //скрываем визуализацию отмеченных лайков при отсутствии токена
    useEffect(() => {
        if (tokenStatus === 'init') {
            document.querySelectorAll('.likeOn').forEach(el => el.classList.remove('likeOn'));
        }
    }, [tokenStatus])
    //при любом изменении в лайках диспатчим в стор новые данные
    useEffect(() => {
        if (touched) {
            dispatch(setLikes(photoId, valueLike, newMyLike));
        }
    }, [touched, dispatch, photoId, valueLike, newMyLike])

    const likeOn = newMyLike ? ' likeOn' : '';
    const ariaLabel = newMyLike ? 'удалить лайк' : 'поставить лайк';

    return (
        <div className="photo__likes likes">
            <div className="likes__number">{valueLike}</div>
            <button className={`likes__button${likeOn}`} onClick={handleClick} aria-label={ariaLabel}/>
        </div>
    );
}

export default Likes;