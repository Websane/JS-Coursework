import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {pushLike, setLikes, unLike} from "../action/likeActions";
import {checkToken} from "./Header";

const Likes = ({ like, myLike, photoId }) => {
    const [newLike, setNewLike] = useState(like);
    const [newMyLike, setNewMyLike] = useState(myLike);
    const [touched, setTouched] = useState(0);

    const dispatch = useDispatch();
    //обработчик лайка
    const handleClickLike = () => {
        if (checkToken()) {
            setTouched(1);
            dispatch(pushLike(photoId));
            setNewLike(prev => prev + 1);
            setNewMyLike(true);
        } else {
            setTouched(0);
            alert('Необходимо авторизоваться');
        }
    }
    //обработчик дизлайка
    const handleClickUnLike = () => {
        if (checkToken()) {
            setTouched(-1);
            dispatch(unLike(photoId));
            setNewLike(prev => prev - 1);
            setNewMyLike(false);
        } else {
            setTouched(0);
            alert('Необходимо авторизоваться')
        }
    }
    //при любом изменении в лайках диспатчим в стор новые данные
    useEffect(() => {
        if (touched !== 0) {
            dispatch(setLikes(photoId, newLike, newMyLike));
        }
    }, [touched])

    return (
        <div className="likes">
            <div className="likes__number">{newLike}</div>
            {!newMyLike &&
            <button className="likes__button" onClick={handleClickLike} />}
            {newMyLike &&
            <button className="likes__button likeOn" onClick={handleClickUnLike} />}
        </div>
    );
}

export default Likes;