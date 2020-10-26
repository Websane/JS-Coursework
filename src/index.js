import React from 'react';
import ReactDOM from 'react-dom';

import UserInfo from "./UserInfo";
import PhotoElement from "./PhotoElement";
import DateCreated from "./DateCreated";
import LikesSum from "./LikesSum";

import Unsplash, { toJson } from 'unsplash-js';

import './style.css';

// Создаем экземпляр объекта для доступа к API
const unsplash = new Unsplash({
    // accesskey из настроек вашего приложения
    accessKey: 'ZOBvQJqoyhLfAsmFOqjwgnLrDNAxVcGM3s9HzEeMVqw',
    // Application Secret из настроек вашего приложения
    secret: 'GryXYpVogsKBxwwTsdRkr8qM_MyXndBc2UzjjfLCOmY',
    // Полный адрес страницы авторизации приложения (Redirect URI)
    // Важно: этот адрес обязательно должен быть указан в настройках приложения
    callbackUrl: 'http://localhost:3000'
});
// // Генерируем адрес страницы аутентификации на unsplash.com
// // и указываем требуемые разрешения (permissions)
// const authenticationUrl = unsplash.auth.getAuthenticationUrl([
// 	"public",
// 	"write_likes"
// 	]);
// // Отправляем пользователя по этому адресу
// window.location.assign(authenticationUrl);
// // Считываем GET-параметр code из URL
// const code = window.location.search.split('code=')[1];
// // Если код передан, отправляем запрос на получение токена
// if (code) {
// 	unsplash.auth.userAuthentication(code)
// 	.then(toJson)
// 	.then(json => {
// 		unsplash.auth.setBearerToken(json.access_token);
//  // Теперь можно сделать что-то от имени пользователя
//  // Например, поставить лайк фотографии
//  // unsplash.photos.likePhoto("kBJEJqWNtNY");
// 	});
// }

//забираем с Unsplash 10 рандомных фото
unsplash.photos.listPhotos(2, 10, "latest")
    .then(toJson)
    .then(json => {
        //записываем полученный массив в переменную
        const photosRandom = json;

        class Images extends React.Component {
            constructor(props) {
                super(props);
                //записываем в текущее состояние массив с ключом photos
                this.state = {photos: photosRandom};
            }

            render() {
                return (
                    <div className="container">
                    {this.state.photos.map((item , i) =>
                        <div key={i} className="photo">
                            <PhotoElement
                            url={item.urls.regular}
                            alt={item.alt_description}
                            />
                            <UserInfo
                            user={item.user.username}
                            html={item.user.links.html}
                            />
                            <DateCreated
                            date={item.created_at}
                            />
                            <LikesSum
                            likes={item.likes}
                            />
                        </div>
                        )
                    }
                    </div>
                )
            }
        }

        ReactDOM.render(
            <React.StrictMode>
                <Images />
            </React.StrictMode>,
            document.getElementById('root')
        );

    });