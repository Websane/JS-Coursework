import React from "react";
import {Link} from "react-router-dom";

import TextContent from "./TextContent";
import Likes from "../containers/Likes";

const Photo = ({ photo, photoId, quality }) => {

    const size = quality ? 'regular' : 'small';
    const className = quality ? ' photo__quality' : '';
    const nope = quality ? ' nope' : '';

    return (
        <div className="photo__content">
            <img className={`photo__preview${className}`} src={photo.urls[size]} alt={photo.alt_description} />
            <Link className={`photo__link${nope}`} to={`/photo/${photoId}`} />
            <div className="photo__text">
                <TextContent text={photo} />
                <Likes like={photo.likes} myLike={photo.liked_by_user} photoId={photoId} />
            </div>
        </div>
    )
}

export default Photo;