// import React, {useEffect, useState} from 'react';
// import {useDispatch} from "react-redux";
//
// import {pushLike, setLikes, unLike} from "../action/likeActions";
// import {checkToken} from "./Header";
//
// const Likes = ({ like, myLike, photoId }) => {
//     const [valueLike, setValueLike] = useState(like);
//     const [newMyLike, setNewMyLike] = useState(myLike);
//     const [touched, setTouched] = useState(0);
//
//     const dispatch = useDispatch();
//     //обработчик лайка
//     const handleClickLike = () => {
//         if (checkToken()) {
//             setTouched(1);
//             dispatch(pushLike(photoId));
//             setValueLike(prev => prev + 1);
//             setNewMyLike(true);
//         } else {
//             setTouched(0);
//             alert('Необходимо авторизоваться');
//         }
//     }
//     //обработчик дизлайка
//     const handleClickUnLike = () => {
//         if (checkToken()) {
//             setTouched(-1);
//             dispatch(unLike(photoId));
//             setValueLike(prev => prev - 1);
//             setNewMyLike(false);
//         } else {
//             setTouched(0);
//             alert('Необходимо авторизоваться')
//         }
//     }
//
//     //при любом изменении в лайках диспатчим в стор новые данные
//     useEffect(() => {
//         if (touched !== 0) {
//             dispatch(setLikes(photoId, valueLike, newMyLike));
//         }
//     }, [touched])
//
//     return (
//         <div className="likes">
//             <div className="likes__number">{valueLike}</div>
//             {!newMyLike &&
//             <button className="likes__button" onClick={handleClickLike} />}
//             {newMyLike &&
//             <button className="likes__button likeOn" onClick={handleClickUnLike} />}
//         </div>
//     );
// }

// export default Likes;

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
    //при любом изменении в лайках диспатчим в стор новые данные
    useEffect(() => {
        if (touched) {
            dispatch(setLikes(photoId, valueLike, newMyLike));
        }
    }, [touched])

    let likeOn = newMyLike ? ' likeOn' : '';

    return (
        <div className="likes">
            <div className="likes__number">{valueLike}</div>
            <button className={`likes__button${likeOn}`} onClick={handleClick} />
        </div>
    );
}

export default Likes;