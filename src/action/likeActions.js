import {unsplash} from "../api";
import {toJson} from "unsplash-js/lib/unsplash";

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_REQUEST_SUCCESS = 'LIKE_REQUEST_SUCCESS';
export const LIKE_REQUEST_ERROR = 'LIKE_REQUEST_ERROR';

export const UNLIKE_REQUEST = 'UNLIKE_REQUEST';
export const UNLIKE_REQUEST_SUCCESS = 'UNLIKE_REQUEST_SUCCESS';
export const UNLIKE_REQUEST_ERROR = 'UNLIKE_REQUEST_ERROR';

export const SET_PHOTO_LIKES = 'SET_PHOTO_LIKES';

export const likeRequest = () => ({
    type: LIKE_REQUEST,
})
export const likeRequestSuccess = () => ({
    type: LIKE_REQUEST_SUCCESS,
})
export const likeRequestError = (error) => ({
    type: LIKE_REQUEST_ERROR,
    error,
})

// export const unLikeRequest = () => ({
//     type: LIKE_REQUEST,
// })
// export const unLikeRequestSuccess = () => ({
//     type: LIKE_REQUEST_SUCCESS,
// })
// export const unLikeRequestError = (error) => ({
//     type: LIKE_REQUEST_ERROR,
//     error,
// })

export const setPhotoLikes = (id, likes, myLike) => ({
    type: SET_PHOTO_LIKES,
    id,
    likes,
    myLike,
})

// export const pushLike = (id) => (dispatch) => {
//         dispatch(likeRequest());
//         unsplash.photos.likePhoto(id)
//         .then(toJson)
//         .then(
//                 dispatch(likeRequestSuccess())
//         )
//         .catch(error => {
//             console.log(error);
//             dispatch(likeRequestError(String(error)));
//         })
// }
//
// export const unLike = (id) => (dispatch) => {
//     dispatch(unLikeRequest());
//     unsplash.photos.unlikePhoto(id)
//         .then(toJson)
//         .then(
//                 dispatch(unLikeRequestSuccess())
//         )
//         .catch(error => {
//             console.log(error);
//             dispatch(unLikeRequestError(String(error)));
//         })
// }

export const setLikes = (id, likes, myLikes) => (dispatch) => {
    dispatch(setPhotoLikes(id, likes, myLikes));
}
//редюсер для setLike в photosReducer
export const setLike =(like, id) => (dispatch) => {
    dispatch(likeRequest());
    unsplash.photos[like ? 'unlikePhoto' : 'likePhoto'](id)
        .then(toJson)
        .then(dispatch(likeRequestSuccess()))
        .catch(error => {
            console.log(error);
            dispatch(likeRequestError(String(error)));
        })
}