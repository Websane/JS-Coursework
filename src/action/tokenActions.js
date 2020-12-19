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
export const tokenRequestSuccess = (token) => ({
    type: TOKEN_REQUEST_SUCCESS,
    token,
})
export const tokenRequestError = (error) => ({
    type: TOKEN_REQUEST_ERROR,
    error,
})
//события отмены токена
export const tokenDelete = (token) => ({
    type: TOKEN_DELETE,
    token,
})

//запрос токена для авторизации
export const getToken = (code) => (dispatch) => {
    dispatch(tokenRequest());
    unsplash.auth.userAuthentication(code)
        .then(toJson)
        .then(response => {
            if (response.error === 'invalid_grant') {
                dispatch(tokenRequestError(response.error));
            } else {
                localStorage.setItem('token', JSON.stringify(response.access_token));
                unsplash.auth.setBearerToken(response.access_token);
                dispatch(tokenRequestSuccess(response.access_token));
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(tokenRequestError(String(error)));
        })
}
//для изменения статуса токена
export const tokenDel = () => (dispatch) => {
    dispatch(tokenDelete(''));
}