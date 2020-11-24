import React from "react";

const TextContent = ({ text }) => {
    const date = new Date(text.created_at).toLocaleString();

    return(
        <div className='userInfo'>
            <a className='userInfo__link' href={text.user.links.html}>{text.user.username}</a>
            <small className='userInfo__date'>{date}</small>
        </div>
    );
}

export default TextContent;