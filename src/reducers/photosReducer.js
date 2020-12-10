import {
    PHOTOS_REQUEST,
    PHOTOS_REQUEST_ERROR,
    PHOTOS_REQUEST_SUCCESS
} from "../action/photosActions";
import {SET_PHOTO_LIKES} from "../action/likeActions";

const initialState = {
    status: 'success', //'loading' 'error'
    photos: [],
    page: 1,
    perPage: 10,
    errorMessage: '',
    loading: false,
};

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case PHOTOS_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            };
        case PHOTOS_REQUEST_SUCCESS:
            let newPhotos = state.photos.concat(action.data.photos);
            console.log(action.data)
            let newPage = action.data.page + 1;
            return {
                ...state,
                status: 'success',
                photos: newPhotos,
                page: newPage,
                loading: false,
            }
        case PHOTOS_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        case SET_PHOTO_LIKES:
            const newArray = state.photos.slice();
            console.log(newArray)
            let photo = newArray.find(item => item.id === action.id);
            const ind = newArray.findIndex(item => item.id === action.id);
            photo = {...photo, likes: action.likes, liked_by_user: action.myLike};
            newArray.splice(ind, 1, photo);
            console.log(newArray)
            return {
                ...state,
                photos: newArray,
            }
        default: return state
    }
}

export default photosReducer;