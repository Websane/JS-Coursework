import {AUTH_REQUEST,
    AUTH_REQUEST_ERROR,
    AUTH_REQUEST_SUCCESS
} from "../action/authActions";

const initialState = {
    status: 'success', //'loading' 'error'
    url: '/',
    errorMessage: '',
    loading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            };
        case AUTH_REQUEST_SUCCESS:
            return {
                ...state,
                status: 'success',
                url: action.url,
                loading: false,
            }
        case AUTH_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        default: return state
    }
}

export default authReducer;