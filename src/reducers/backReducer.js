import {BACK_VIEW} from "../action/backActions";

let initialState = {
    back: false,
}

const backReducer = (state = initialState, action) => {
    switch (action.type) {
        case BACK_VIEW:
            const {back} = action;
            return {
                ...state,
                back,
            }
        default: return state
    }
}

export default backReducer;