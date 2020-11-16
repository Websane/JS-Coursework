import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchPhotos} from "../action/fetchPhotosAction";
import useScroll from "../hooks/useScroll";

const MoreButton = () => {
    const photos = useSelector(state => state.wall.photos);
    const page = useSelector(state => state.wall.page);
    const perPage = useSelector(state => state.wall.perPage);
    // const [page, setPage] = useState(1)

    const scrollPosition = useScroll();

    //получаем хук, позволяющий диспатчить экшены в стор
    const dispatch = useDispatch();
    //пишем обработчик клика, чтобы загружать следующий комплект фото
    const handlerLoadNextPage = useCallback(() => {
        const newPage = page + 1;
        // const newPage = setPage((prevPage) => prevPage + 1)
        dispatch(fetchPhotos(newPage, perPage));
    }, [page, perPage])

    useEffect(() => {
        if (scrollPosition >= (document.body.offsetHeight - window.innerHeight)) {
            handlerLoadNextPage();
        }
    }, [scrollPosition, handlerLoadNextPage])

    let buttonView;

    if (photos.length) {
     buttonView =
        <button className="more__button" onClick={handlerLoadNextPage}>
           Показать еще
        </button>
    }

    return (
        <div>{buttonView}</div>
    );
}


export default MoreButton