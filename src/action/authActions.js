import {unsplash} from "../api";

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';

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