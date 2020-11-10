import {FETCH_PHOTOS} from "../action/types";

const initialState = {
    status: 'idle', // (idle | process | error)
    photos: [],
    page: 1,
    perPage: 10,
    errText: '',
};

const photosReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_PHOTOS:
            let newPhotos = state.photos.concat(action.payload.photos)
            console.log(newPhotos)
            return { ...state, photos: newPhotos, page: action.payload.page }
        default: return state
    }
}

export default photosReducer;