import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import MoreButton from "../components/MoreButton";
import Photo from "../components/Photo";

import {photosRequestAsync} from "../action/photosActions";
import {backView} from "../action/backActions";

const Wall = () => {
    const photos = useSelector(state => state.wall.photos);
    const page = useSelector(state => state.wall.page);
    const perPage = useSelector(state => state.wall.perPage);
    const loading = useSelector(state => state.wall.loading)
    const errorMessage = useSelector(state => state.wall.errorMessage);

    const dispatch = useDispatch();

    //получаем константу чтоб отметить нужный элемент
    const bottomOfList = useRef(null);

    useEffect(() => {
        //создаем наблюдатель, производящий действие за 70 px до конца скролла вниз страницы
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && page > 1 && page % 10 !== 0) {
                dispatch(photosRequestAsync(page, perPage))
            }
        }, {
            rootMargin: '70px',
        })
        //говорим наблюдателю, за каким элементом смотреть
        if (bottomOfList.current) {
            observer.observe(bottomOfList.current);
        }
        //делаем отписку от того, что считал предыдущий эффект
        return () => {
            if (bottomOfList.current) {
                observer.unobserve(bottomOfList.current);
            }
        }
    }, [bottomOfList.current, page])
    //запрос списка фото при первом загрузке страницы
    useEffect(() => {
        // if (page === 1) {
            dispatch(photosRequestAsync(page, perPage));
            //кнопка назад для стены всегда скрыта
            dispatch(backView(false));
        // }
    }, []);
    //обработчик загрузок дополнительных списков фото
    const handleLoadNextPage = useCallback(() => {
        dispatch(photosRequestAsync(page, perPage))
    }, [page, perPage]);

    return(
        <section className="wall">
            {photos.length === 0 && !loading && !errorMessage && (
                <div className="loadingPhoto">Нет ни одного фото</div>
            )}

            {loading && (
                <div className="loadingPhoto">Загрузка фото...</div>
            )}

            {errorMessage && (
                <div className="loadingPhoto">{errorMessage}</div>
            )}

            <div className="wall__container container">
                <div className="wall__photos">
                {photos.map((item, i) =>
                    <div key={i} className="photo">
                        <Photo photo={item} photoId={item.id} quality={false} />
                    </div>
                )}
                </div>
                {page % 10 === 0 && <MoreButton handleClick={handleLoadNextPage}/>}
            </div>

            <div ref={bottomOfList} />

        </section>
    );
}

export default Wall;