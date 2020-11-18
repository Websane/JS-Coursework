import React from "react";

const TextContent = ({ text }) => {
    return(
        <div className='userInfo'>
            <div>
                Автор фото:
                <a href={text.user.links.html}> {text.user.username}</a>
            </div>
            <div>
                Дата размещения: {text.created_at}
            </div>
            <div>
                Понравилось: {text.likes}
            </div>
        </div>
    );
}

export default TextContent;