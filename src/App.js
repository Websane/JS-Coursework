import React from "react";

import './style.css';

import Wall from "./containers/Wall";

import {Route, BrowserRouter} from "react-router-dom";
import PhotoImage from "./containers/PhotoImage";


let App = () => {

    return (
        <BrowserRouter>
            <div className="container">
                <Route exact path="/" component={Wall} />
                <Route exact path="/photo/:photoId" component={PhotoImage} />
            </div>
        </BrowserRouter>
    );

}

export default App;