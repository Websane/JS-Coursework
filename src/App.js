import React from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";

import PhotoImage from "./containers/PhotoImage";
import Header from "./containers/Header";
import Wall from "./containers/Wall";

import './style.css';

let App = () => {
    return (
        <Router>
            <Header />
            <Route path="/auth" component={Wall} />
            <Route exact path="/" component={Wall} />
            <Route exact path="/photo/:photoId" component={PhotoImage} />
        </Router>
    );
}

export default App;