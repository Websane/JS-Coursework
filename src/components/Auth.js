import React from "react";

function Auth ({ url, text, handle }) {
    const element = text === 'Войти' ?
        <a
            href={url}
            className="header__auth"
            aria-label="авторизоваться"
        >
            {text}
        </a>
        :
        <button
            className="header__auth"
            onClick={handle}
            aria-label="отменить авторизацию"
        >
            {text}
        </button>

    return (
        <>
            {element}
        </>
    )
}

export default Auth;