import {combineReducers} from "redux";
import photosReducer from "./photosReducer";
import backReducer from "./backReducer";
import authReducer from "./authReducer";
import tokenReducer from "./tokenReducer";
import likeReducer from "./likeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers( {
    wall: photosReducer,
    interaction: backReducer,
    auth: authReducer,
    token: tokenReducer,
    user: userReducer,
    like: likeReducer,
})

export default rootReducer;