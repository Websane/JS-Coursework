import React from "react";
import {NavLink} from "react-router-dom";

const Photo = ({ photo, index, quality }) => {

    let size;

    if (!quality) {
        size = photo.urls.thumb
    } else {
        size = photo.urls.regular
    }

    return (
        <div className="photoView">
            <img className='photoElement' src={size} alt={photo.alt_description}/>
            <NavLink className='photoLink' to={`/photo/${index}`} />
        </div>
    )
}

export default Photo;