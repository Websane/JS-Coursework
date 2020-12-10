import {unsplash} from "../api";
import {toJson} from "unsplash-js";

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_REQUEST_SUCCESS = 'TOKEN_REQUEST_SUCCESS';
export const TOKEN_REQUEST_ERROR = 'TOKEN_REQUEST_ERROR';

//события для получения адреса авторизации
export const authRequest = () => ({
    type: AUTH_REQUEST,
})
export const authRequestSuccess = (url) => ({
    type: AUTH_REQUEST_SUCCESS,
    url,
})
export const authRequestError = (error) => ({
    type: AUTH_REQUEST_ERROR,
    error,
})

//события для получения токена
export const tokenRequest = () => ({
    type: TOKEN_REQUEST,
})
export const tokenRequestSuccess = () => ({
    type: TOKEN_REQUEST_SUCCESS
})
export const tokenRequestError = (error) => ({
    type: TOKEN_REQUEST_ERROR,
    error,
})

//запрос url для авторизации
export const getAuthUrl = () => (dispatch) => {
    try {
        dispatch(authRequest());
        const authUrl = unsplash.auth.getAuthenticationUrl(['public', 'write_likes']);
        dispatch(authRequestSuccess(authUrl));
    } catch (error) {
            console.log(error);
            dispatch(authRequestError(String(error)));
        }
}
//запрос токена для авторизации
export const getToken = (code) => (dispatch) => {
    dispatch(tokenRequest());
    unsplash.auth.userAuthentication(code)
    .then(toJson)
    .then(response => {
        const token = response.access_token;
        localStorage.setItem('token', JSON.stringify(token));
        unsplash.auth.setBearerToken(response.access_token);
        dispatch(tokenRequestSuccess());
    })
    .catch(error => {
        console.log(error);
        dispatch(tokenRequestError(String(error)));
    })
}

//удаление адреса
export const deleteUrl = () => (dispatch) => {
    dispatch(authRequestSuccess('/'))
}
