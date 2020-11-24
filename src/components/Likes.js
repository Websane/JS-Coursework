import React from 'react';

const Likes = ({like, handleClickLike}) => {

    return (
        <div className="likes">
            <div className="likes__number">{like.likes}</div>
            <button className="likes__button" onClick={handleClickLike} />
        </div>
    );
}

export default Likes;