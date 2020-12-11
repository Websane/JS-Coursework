import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import MoreButton from "../components/MoreButton";
import Photo from "../components/Photo";

import {photosRequestAsync} from "../action/photosActions";
import {backView} from "../action/backActions";
import {getToken} from "../action/tokenActions";
import {getUser} from "../action/userActions";

const Wall = () => {
    const photos = useSelector(state => state.wall.photos);
    const page = useSelector(state => state.wall.page);
    const perPage = useSelector(state => state.wall.perPage);
    const loading = useSelector(state => state.wall.loading)
    const errorMessage = useSelector(state => state.wall.errorMessage);

    const authStatus = useSelector(state => state.auth.status);
    const code = window.location.search.split('code=')[1];

    const tokenStatus = useSelector(state => state.token.status);
    const localToken = localStorage.getItem('token');

    const dispatch = useDispatch();
    //скрываем визуализацию отмеченных лайков при отсутствии токена
    useEffect(() => {
        if (tokenStatus === 'init') {
            document.querySelectorAll('.likeOn').forEach(el => el.classList.remove('likeOn'));
        }
    }, [tokenStatus])

    //получаем константу чтоб отметить нужный элемент
    const bottomOfList = useRef(null);

    useEffect(() => {
        //создаем наблюдатель, производящий действие за 5 px до конца скролла вниз страницы
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && page > 1 && page % 10 !== 0) {
                dispatch(photosRequestAsync(page, perPage))
            }
        }, {
            rootMargin: '5px',
        })

        const bottom = bottomOfList.current;
        //говорим наблюдателю, за каким элементом смотреть
        if (bottom) {
            observer.observe(bottom);
        }
        //делаем отписку от того, что считал предыдущий эффект
        return () => {
            if (bottom) {
                observer.unobserve(bottom);
            }
        }
    }, [page, perPage, dispatch])
    //получаем токен при появлении в адресной строке code
    useEffect(() => {
        if (code && tokenStatus === 'init' && !localToken || localToken === undefined && authStatus === 'success') {
            dispatch(getToken(code));
        }
    }, [code, authStatus])
    //после получения токена загружаем фото только после того как ответ получен, если его нет, просто загружаем
    useEffect(() => {
         if (tokenStatus === 'success' && page === 1) {
             dispatch(getUser());
             dispatch(photosRequestAsync(page, perPage));
         } else if (!code && tokenStatus === 'init' && page === 1) {
             dispatch(photosRequestAsync(page, perPage));
         } else if (tokenStatus === 'init' && localToken) {
             dispatch(photosRequestAsync(page, perPage));
         }
    }, [tokenStatus, code]);

    //обработчик загрузок дополнительных списков фото
    const handleLoadNextPage = useCallback(() => {
        dispatch(photosRequestAsync(page, perPage))
    }, [page, perPage]);

    return(
        <section className="wall">
            <div className="wall__container container">
                <div className="wall__photos">
                    {photos.map((item, i) =>
                        <div key={i} className="wall__photo photo">
                            <Photo photo={item} photoId={item.id} quality={false} />
                        </div>
                    )}
                </div>

                {loading && (
                    <div className="loadingPhoto">Загрузка фото...</div>
                )}

                {errorMessage && (
                    <div className="loadingPhoto">{errorMessage}</div>
                )}
                {page % 10 === 0 && <MoreButton handleClick={handleLoadNextPage}/>}
            </div>

            <div ref={bottomOfList} />

        </section>
    );
}

export default Wall;