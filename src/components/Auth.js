import React from "react";


function Auth ({ url, text, handle }) {
    let element
    if (url !== '/') {
        element = <a href={url} className="auth">
            {text}
    </a>
    } else {
        element = <button className="auth" onClick={handle}>{text}</button>
    }
    return (
        <>
        {element}
        </>
    )
}

export default Auth;