import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TextContent from "../components/TextContent";
import Photo from "../components/Photo";
import Likes from "../components/Likes";
import {backView} from "../action/backVew";

const PhotoImage = ({ match }) => {
    //забираем массив со всеми фото
    const photos = useSelector(state => state.wall.photos);
    const back = useSelector(state => state.interaction.back);

    const dispatch = useDispatch();

    let scrollPosition = JSON.parse(localStorage.getItem('scroll'));

    useEffect(() => {
        dispatch(backView(!back, scrollPosition));
    }, []);

    //забираем id фото из роутера
    const {params: {photoId} } = match;
    //ищем в массиве фотографий нужное фото по id
    const photo = photos.find(item => item.id === photoId);

    return (
        <div className="image__container container">
            <div className="photo__image">
                <Photo photo={photo} index={photoId} quality={true} />
                <div className="textContent">
                    <TextContent text={photo} />
                    <Likes like={photo} />
                </div>
            </div>
        </div>
    )

}

export default PhotoImage;