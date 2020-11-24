import React from "react";

import './style.css';

import Wall from "./containers/Wall";

import {Route, BrowserRouter} from "react-router-dom";
import PhotoImage from "./containers/PhotoImage";
import Header from "./containers/Header";



let App = () => {

    return (
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Wall} />
            <Route exact path="/photo/:photoId" component={PhotoImage} />
        </BrowserRouter>
        // <BrowserRouter>
        //     <Header />
        //     <Route path="/">
        //         <Wall />
        //     </Route>
        //     <Route path="/photo/:photoId">
        //         <PhotoImage />
        //     </Route>
        // </BrowserRouter>
    );

}

export default App;