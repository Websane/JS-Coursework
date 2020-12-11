import {
    LIKE_REQUEST,
    LIKE_REQUEST_ERROR,
    LIKE_REQUEST_SUCCESS,
    UNLIKE_REQUEST,
    UNLIKE_REQUEST_ERROR,
    UNLIKE_REQUEST_SUCCESS
} from "../action/likeActions";

const initialState = {
    status: 'init', //'success' 'loading' 'error'
    errorMessage: '',
    loading: false,
};

const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            };
        case LIKE_REQUEST_SUCCESS:
            return {
                ...state,
                status: 'success',
                loading: false,
            }
        case LIKE_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        default: return state
    }
}

export default likeReducer;