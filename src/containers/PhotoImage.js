import React from "react";
import {useSelector} from "react-redux";
import TextContent from "../components/TextContent";
import Photo from "../components/Photo";

const PhotoImage = ({ match }) => {
    //забираем массив со всеми фото
    const photos = useSelector(state => state.wall.photos);
    //забираем id фото из роутера
    const {params: {photoId} } = match;
    //ищем в массиве фотографий нужное фото по id
    const photo = photos.find(item => item.id === photoId);

    return (
        <>
            <Photo photo={photo} index={photoId} quality={true}/>
            <TextContent text={photo} />
        </>
    )

}

export default PhotoImage;