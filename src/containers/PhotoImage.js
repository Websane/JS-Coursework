import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import Photo from "../components/Photo";
import {backView} from "../action/backActions";

const PhotoImage = ({ match }) => {
    const photos = useSelector(state => state.wall.photos);

    const dispatch = useDispatch();

    const history = useHistory();
    //отображаем кнопку "назад"
    useEffect(() => {
            dispatch(backView(true));
    }, []);

    //забираем id фото из роутера
    const {params: {photoId} } = match;
    //ищем в массиве фотографий нужное фото по id
    // const photo = photos.find(item => item.id === photoId);
    const photo = photos.find(({id}) => id === photoId);
    //если обновляем страницу на просмотре фото
    if (photos.length === 0) {
        history.push('/');
        return <></>
    } else {
        return (
            <div className="image__container container">
                <div className="photo__image">
                    <Photo photo={photo} photoId={photoId} quality={true} />
                </div>
            </div>
        )
    }
}

export default PhotoImage;