import React, {useCallback, useEffect} from "react";

import TextContent from "../components/TextContent";
import MoreButton from "../components/MoreButton";
import Photo from "../components/Photo";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhotos} from "../action/fetchPhotosAction";
import useScroll from "../hooks/useScroll";

const Wall = () => {
    const photos = useSelector(state => state.wall.photos);
    const page = useSelector(state => state.wall.page);
    const perPage = useSelector(state => state.wall.perPage);

    const scrollPosition = useScroll();

    //получаем хук, позволяющий диспатчить экшены в стор
    const dispatch = useDispatch();
    //после рендера компонента диспатчим в стор экшен с получаемым от cервера ответом
    //редюсер обрабатывает полученый экшен и обновляет стор
    //компонент видит обновление стора и перерисовывается
    useEffect(() => {
        dispatch(fetchPhotos(page, perPage));
    }, []);

    //пишем обработчик загрузки следующего комплекта фото
    const handleLoadNextPage = useCallback(() => {
        const newPage = page + 1;
        dispatch(fetchPhotos(newPage, perPage));
    }, [page, perPage]);

    useEffect(() => {
        if (scrollPosition >= (document.body.offsetHeight - window.innerHeight)) {
            handleLoadNextPage();
        }
    }, [scrollPosition, handleLoadNextPage]);


    return(
        <div className="photosWrapper">
            {photos.map((item, i) =>
                <div key={i} className="photo">
                    <Photo photo={item} index={item.id} quality={false} />
                    <TextContent text={item} />
                </div>
            )}
            <MoreButton handleClick={handleLoadNextPage}/>
        </div>
    );
}

export default Wall;