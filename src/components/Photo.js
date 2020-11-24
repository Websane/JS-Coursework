import React from "react";
import {Link} from "react-router-dom";

const Photo = ({ photo, index, quality}) => {

    let element

    if (!quality) {
        element =
            <>
                <img className='photoElement' src={photo.urls.small} alt={photo.alt_description} />
                <Link className='photoLink' to={`/photo/${index}`} />
            </>
    } else {
        element = <img className='photoElement' src={photo.urls.regular} alt={photo.alt_description}/>
    }

    return (
        <div className="photoView">
            {element}
        </div>
    )
}

export default Photo;