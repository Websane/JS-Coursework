import {unsplash} from "../api";
import {toJson} from "unsplash-js";

export const USER_REQUEST = 'TOKEN_REQUEST';
export const USER_REQUEST_SUCCESS = 'TOKEN_REQUEST_SUCCESS';
export const USER_REQUEST_ERROR = 'TOKEN_REQUEST_ERROR';

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