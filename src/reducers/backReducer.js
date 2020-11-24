import {BACK_VIEW} from "../action/types";

let initialState = {
    back: true,
    scrollPosition: null,
}

const backReducer = (state = initialState, action) => {

    switch (action.type) {
        case BACK_VIEW:
            let back = action.back;
            let scrollPosition = action.scrollPosition;
            return { ...state, back: back, scrollPosition: scrollPosition }
        default: return state
    }
}

export default backReducer;