import React from 'react';
//объявляем компонент для фото
const PhotoElement = (props) => {
    return (
        <img className='photo' src={props.url} alt={props.alt}/>
    );
}

export default PhotoElement;