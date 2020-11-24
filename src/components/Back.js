import React from "react";

function Back ({ back, handleBackClick }) {

    let newClass = 'hidden';

    if (back === true ) {
        newClass = 'back'
    }

    return (
        <button className={newClass} onClick={handleBackClick} />
    )
}

export default Back;