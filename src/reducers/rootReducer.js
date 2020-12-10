import {combineReducers} from "redux";
import photosReducer from "./photosReducer";
import backReducer from "./backReducer";
import authReducer from "./authReducer";
import tokenReducer from "./tokenReducer";
import likeReducer from "./likeReducer";

const rootReducer = combineReducers( {
    wall: photosReducer,
    interaction: backReducer,
    auth: authReducer,
    token: tokenReducer,
    like: likeReducer,
})

export default rootReducer;