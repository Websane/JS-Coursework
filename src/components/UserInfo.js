import React from 'react';
//объявляем компонент для имени автора и ссылки на его профиль
const UserInfo = (props) => {
    return (
        <div className='userInfo'>
            <div>Имя автора: {props.user}</div>
            <a href={props.html}>Посетить страницу автора</a>
        </div>
    );
}

export default UserInfo;
