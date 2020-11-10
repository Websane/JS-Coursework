import Unsplash, { toJson } from 'unsplash-js';

// Создаем экземпляр объекта для доступа к API
const unsplash = new Unsplash({

    accessKey: 'ZOBvQJqoyhLfAsmFOqjwgnLrDNAxVcGM3s9HzEeMVqw',

    secret: 'GryXYpVogsKBxwwTsdRkr8qM_MyXndBc2UzjjfLCOmY',

    // Важно: этот адрес обязательно должен быть указан в настройках приложения
    callbackUrl: 'http://localhost:3000',
});
//устанавливаем дефолтное количество загружаемых фото
const defaultPerPage = 10;

export default {

    setAccessToken(accessToken) {
        unsplash.auth.setBearerToken(accessToken);
    },
// Генерирование адреса страницы аутентификации с указанием требуемых разрешений
    getAuthUrl() {
        return unsplash.auth.getAuthenticationUrl(['public', 'write_likes']);
    },
// Запрос токена доступа
    getToken(code) {

        return new Promise((resolve, reject) => {

            unsplash.auth.userAuthentication(code)

                .then(toJson)

                .then(tokenData => {

                    if (tokenData.error) {

                        reject(`${tokenData.error}: ${tokenData.error_description}`);
                        return;
                    }

                    resolve(tokenData);

                })
                .catch(e => {

                    reject(e);

                });
        });

    },

    getUser() {

        return new Promise((resolve, reject) => {

            unsplash.currentUser.profile()

                .then(toJson)

                .then(userData => {

                    if (userData.error)
                        reject(`${userData.error}: ${userData.error_description}`);

                    resolve(userData);

                })
                .catch(e => {

                    reject(e);

                });
        });

    },

    getPhotos(page = 1, perPage = defaultPerPage) {

        return new Promise((resolve, reject) => {

            try {

                unsplash.photos.listPhotos(page, perPage, 'latest')

                    .then(toJson)

                    .then(response => {

                        if (response.error)
                            throw new Error(`${response.error}: ${response.error_description}`);

                        resolve({photos: response, page: page});

                    })

            } catch (e) {

                reject(e);

            }

        });

    },

    getPhoto(photoId) {

        return new Promise((resolve, reject) => {

            unsplash.photos.getPhoto(photoId)
                .then(toJson)
                .then(response => {

                    if (response.error)
                        reject(`${response.error}: ${response.error_description}`);

                    resolve(response);

                }).catch(e => {

                reject(e);

            });

        });

    },

    setLike(photoId, like) {

        return new Promise((resolve, reject) => {

            unsplash.photos[like ? 'likePhoto' : 'unlikePhoto'](photoId)
                .then(toJson)
                .then(response => {

                    if (response.error)
                        reject(`${response.error}: ${response.error_description}`);

                    resolve(response);

                }).catch(e => {

                reject(e);

            });
        });
    }

};