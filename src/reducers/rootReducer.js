import {combineReducers} from "redux";
import photosReducer from "./photosReducer";
import backReducer from "./backReducer";

const rootReducer = combineReducers( {
    wall: photosReducer,
    interaction: backReducer
})

export default rootReducer;