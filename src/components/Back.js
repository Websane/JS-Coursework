import React from "react";

function Back ({ back, handleBackClick, handleMouseDown }) {
    const newClass = back ? 'back' : 'back hidden';

    return (
        <button className={newClass} onClick={handleBackClick} onMouseDown={handleMouseDown} aria-label="вернуться назад" />
    )
}

export default Back;