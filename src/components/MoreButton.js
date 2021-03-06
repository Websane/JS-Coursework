import React from 'react';

const MoreButton = ({ handleClick }) => {

    return (
        <button className="more__button" onClick={handleClick} aria-label="показать еще">
            Показать еще
        </button>
    );
}

export default MoreButton;