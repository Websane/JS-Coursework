import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import MoreButton from "../components/MoreButton";
import Photo from "../components/Photo";

import {photosRequestAsync} from "../action/photosActions";
import {getToken} from "../action/tokenActions";
import {getUser} from "../action/userActions";
import {backView} from "../action/backActions";

const Wall = () => {
    const photos = useSelector(state => state.wall.photos);
    const page = useSelector(state => state.wall.page);
    const perPage = useSelector(state => state.wall.perPage);
    const loading = useSelector(state => state.wall.loading)
    const errorMessage = useSelector(state => state.wall.errorMessage);

    const authStatus = useSelector(state => state.auth.status);
    const code = window.location.search.split('code=')[1];

    const tokenStatus = useSelector(state => state.token.status);
    const tokenError = useSelector(state => state.token.errorMessage)
    const userStatus = useSelector(state => state.user.status);

    const statusPhotos = useSelector(state => state.wall.status);
    const back = useSelector(state => state.interaction.back);

    const dispatch = useDispatch();

    //получаем ссылку на нужный компонент DOM дерева
    const bottomOfList = useRef(null);

    useEffect(() => {
        //создаем наблюдатель, производящий действие за 5 px до конца скролла вниз страницы
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && page > 1 && page % 10 !== 0 && statusPhotos === 'success') {
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
    }, [page, perPage, dispatch, statusPhotos]);

    //получаем токен при появлении в адресной строке code
    useEffect(() => {
        if (code && tokenStatus === 'init' && authStatus === 'success') {
            dispatch(getToken(code));
        }
    }, [code, authStatus, tokenStatus, dispatch]);

    useEffect(() => {
        if (!code && page === 1) {
            dispatch(photosRequestAsync(page, perPage));
        }
    }, [code, dispatch, page, perPage])

    useEffect(() => {
        if (tokenStatus === 'success' && userStatus === 'init') {
            dispatch(getUser());
        } else if (tokenStatus === 'success' && userStatus === 'success' && page === 1) {
            dispatch(photosRequestAsync(page, perPage));
        }
    }, [tokenStatus, userStatus, dispatch, page, perPage]);
    //следим чтоб кнопка назад не появилась при переходе назад в браузере
    useEffect(() => {
        if (back) {
            dispatch(backView(false));
        }
    }, [dispatch, back])

    //обработчик загрузок дополнительных списков фото
    const handleLoadNextPage = useCallback(() => {
        dispatch(photosRequestAsync(page, perPage))
    }, [page, perPage, dispatch]);

    return(
        <main>
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
                        <div className="loadingPhoto"></div>
                    )}

                    {errorMessage && (
                        <div className="loadingPhoto">{errorMessage}</div>
                    )}

                    {tokenError === 'invalid_grant' && (
                        <div className="loadingPhoto">Необходимо авторизоваться</div>
                    )}
                    {page % 10 === 0 && <MoreButton handleClick={handleLoadNextPage}/>}
                </div>

                <div ref={bottomOfList} />

            </section>
        </main>
    );
}

export default Wall;