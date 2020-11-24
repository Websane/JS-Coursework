import React, {useCallback, useEffect} from "react";

import TextContent from "../components/TextContent";
import MoreButton from "../components/MoreButton";
import Photo from "../components/Photo";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhotos} from "../action/fetchPhotosAction";
import useScroll from "../hooks/useScroll";
import Likes from "../components/Likes";
import {backView} from "../action/backVew";

const Wall = () => {

    const photos = useSelector(state => state.wall.photos);
    const page = useSelector(state => state.wall.page);
    const perPage = useSelector(state => state.wall.perPage);
    const back = useSelector(state => state.interaction.back);
    // const scrollToY = useSelector(state => state.interaction.scrollPosition)

    //получаем хук, позволяющий диспатчить экшены в стор
    const dispatch = useDispatch();

    let scr = JSON.parse(localStorage.getItem('scroll'));

    useEffect(() => {
        window.scrollTo(0, scr);
    }, [])

    const scrollPosition = useScroll();

    useEffect(() => {
        dispatch(backView(!back));
    }, []);
    //после рендера компонента диспатчим в стор экшен с получаемым от cервера ответом
    //редюсер обрабатывает полученый экшен и обновляет стор
    //компонент видит обновление стора и перерисовывается
    useEffect(() => {
        dispatch(fetchPhotos(page, perPage));
    }, []);

    localStorage.setItem('scroll', JSON.stringify(scrollPosition));

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
        <section className="wall">
            <div className="wall__container container">
                {photos.map((item, i) =>
                    <div key={i} className="photo">
                        <Photo photo={item} index={item.id} quality={false}/>
                        <div className="textContent">
                            <TextContent text={item} />
                            <Likes like={item} />
                        </div>
                    </div>
                )}
                <MoreButton handleClick={handleLoadNextPage}/>
            </div>
        </section>
    );
}

export default Wall;