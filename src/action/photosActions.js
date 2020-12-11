import {unsplash} from "../api";
import {toJson} from "unsplash-js";

export const PHOTOS_REQUEST = 'PHOTOS_REQUEST';
export const PHOTOS_REQUEST_SUCCESS = 'PHOTOS_REQUEST_SUCCESS';
export const PHOTOS_REQUEST_ERROR = 'PHOTOS_REQUEST_ERROR';

export const photosRequest = () => ({
    type: PHOTOS_REQUEST,
})
export const photosRequestSuccess = (data) => ({
    type: PHOTOS_REQUEST_SUCCESS,
    data,
})
export const photosRequestError = (error) => ({
    type: PHOTOS_REQUEST_ERROR,
    error,
})

//асинхронный код закрываем внутри редакса
export const photosRequestAsync = (page, perPage) => (dispatch) => {
    dispatch(photosRequest());
    unsplash.photos.listPhotos(page, perPage, 'latest')
    .then(toJson)
    .then(response => {
        const photosData = {photos: response, page: page, perPage: perPage};
        dispatch(photosRequestSuccess(photosData));
    })
    .catch(error => {
        console.log(error);
        dispatch(photosRequestError(String(error)));
    })
}