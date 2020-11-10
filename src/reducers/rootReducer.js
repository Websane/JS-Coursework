import {combineReducers} from "redux";
import photosReducer from "./photosReducer";

const rootReducer = combineReducers( {
    wall: photosReducer
})

export default rootReducer;