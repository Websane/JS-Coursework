import React from 'react';
import ReactDOM from 'react-dom';

import UserInfo from "./components/UserInfo";
import PhotoElement from "./components/PhotoElement";
import DateCreated from "./components/DateCreated";
import LikesSum from "./components/LikesSum";

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
