import {
    TOKEN_DELETE,
    TOKEN_REQUEST,
    TOKEN_REQUEST_ERROR,
    TOKEN_REQUEST_SUCCESS
} from "../action/tokenActions";

const initialState = {
    status: 'init', //'success' 'loading' 'error'
    errorMessage: '',
    loading: false,
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            };
        case TOKEN_REQUEST_SUCCESS:
            return {
                ...state,
                status: 'success',
                loading: false,
            }
        case TOKEN_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        case TOKEN_DELETE:
            return {
                ...state,
                status: 'init',
            }
        default: return state
    }
}

export default tokenReducer;