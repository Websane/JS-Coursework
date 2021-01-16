import {
    USER_DELETE,
    USER_REQUEST,
    USER_REQUEST_ERROR,
    USER_REQUEST_SUCCESS
} from "../action/userActions";

const initialState = {
    status: 'init', //'success' 'loading' 'error'
    name: '',
    errorMessage: '',
    loading: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            };
        case USER_REQUEST_SUCCESS:
            return {
                ...state,
                status: 'success',
                name: action.name,
                loading: false,
            }
        case USER_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        case USER_DELETE:
            return {
                ...state,
                status: 'init',
                name: action.name,
            }
        default: return state
    }
}

export default userReducer;