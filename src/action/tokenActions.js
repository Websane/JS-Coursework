import {unsplash} from "../api";
import {toJson} from "unsplash-js";

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_REQUEST_SUCCESS = 'TOKEN_REQUEST_SUCCESS';
export const TOKEN_REQUEST_ERROR = 'TOKEN_REQUEST_ERROR';
export const TOKEN_DELETE = 'TOKEN_DELETE';

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
//события отмены токена
export const tokenDelete = () => ({
    type: TOKEN_DELETE,
})

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
//для изменения статуса токена
export const tokenDel = () => (dispatch) => {
    dispatch(tokenDelete());
}