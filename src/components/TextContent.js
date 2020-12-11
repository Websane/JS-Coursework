import React from "react";

const TextContent = ({ text }) => {
    const date = new Date(text.created_at).toLocaleString();

    return(
        <div className='photo__user user'>
            <a className='user__link' href={text.user.links.html}>{text.user.username}</a>
            <small className='user__date'>{date}</small>
        </div>
    );
}

export default TextContent;