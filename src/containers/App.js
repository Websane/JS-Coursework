import React from "react";
import MoreButton from "../components/MoreButton";
import '../style.css';
import PhotoBlock from "../components/PhotoBlock";

let App = () => {
    return (
            <div className="container">
                    <PhotoBlock />
                <div className="more">
                    <MoreButton />
                </div>
            </div>
    );
}

export default App