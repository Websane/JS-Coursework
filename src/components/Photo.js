import React from "react";
import {Link} from "react-router-dom";
import TextContent from "./TextContent";
import Likes from "../containers/Likes";

const Photo = ({ photo, photoId, quality }) => {

    let element

    if (!quality) {
        element =
            <>
                <img className='photoElement' src={photo.urls.small} alt={photo.alt_description} />
                <Link className='photoLink' to={`/photo/${photoId}`} />
            </>
    } else {
        element = <img className='photoElement photoBig' src={photo.urls.regular} alt={photo.alt_description} />
    }

    return (
        <div className="photoView">
            {element}
            <div className="textContent">
                <TextContent text={photo} />
                <Likes like={photo.likes} myLike={photo.liked_by_user} photoId={photoId} />
            </div>
        </div>
    )
}

export default Photo;