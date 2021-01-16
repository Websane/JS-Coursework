import React from "react";

function Back ({ back, handleBackClick }) {
    const newClass = back ? 'back' : 'back hidden';
    return (
        <button className={newClass} onClick={handleBackClick} aria-label="вернуться назад" />
    )
}

export default Back;