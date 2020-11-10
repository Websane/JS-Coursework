import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhotos} from "../action/fetchPhotosAction";

const PhotoBlock = () => {
    const photos = useSelector(state => state.wall.photos);
    const page = useSelector(state => state.wall.page);
    const perPage = useSelector(state => state.wall.perPage);
    //получаем хук, позволяющий диспатчить экшены в стор
    const dispatch = useDispatch();
    //после рендера компонента диспатчим в стор экшен с получаемым от cервера ответом
    useEffect(() => {
        console.log('render', page, perPage)
        dispatch(fetchPhotos(page, perPage));
    }, []);

    return(
        photos.map((photo, i) =>
            <div key={i} className="photo">
                <img className='photo' src={photo.urls.thumb} alt={photo.alt_description}/>
                <div className='userInfo'>
                    <div>Имя автора: {photo.user.username}</div>
                    <a href={photo.user.links.html}>Посетить страницу автора</a>
                    <div>
                        Дата размещения: {photo.created_at}
                    </div>
                    <div>
                        Понравилось: {photo.likes}
                    </div>
                </div>
            </div>
        )
    );
}

export default PhotoBlock