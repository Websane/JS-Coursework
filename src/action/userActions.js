import {unsplash} from "../api";
import {toJson} from "unsplash-js";

export const USER_REQUEST = 'USER_REQUEST';
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS';
export const USER_REQUEST_ERROR = 'USER_REQUEST_ERROR';
export const USER_DELETE = 'USER_DELETE';

//события для получения данных юзера
export const userRequest = () => ({
    type: USER_REQUEST,
})
export const userRequestSuccess = (name) => ({
    type: USER_REQUEST_SUCCESS,
    name,
})
export const userRequestError = (error) => ({
    type: USER_REQUEST_ERROR,
    error,
})
export const userDelete = (name) => ({
    type: USER_DELETE,
    name,
})

//запрос токена для авторизации
export const getUser = () => (dispatch) => {
    dispatch(userRequest());
    unsplash.currentUser.profile()
        .then(toJson)
        .then(response => {
            dispatch(userRequestSuccess(response.first_name));
        })
        .catch(error => {
            console.log(error);
            dispatch(userRequestError(String(error)));
        })
}

//для изменения статуса токена
export const userDel = () => (dispatch) => {
    dispatch(userDelete(''));
}