import React, {useEffect} from "react";
import Auth from "../components/Auth";
import Back from "../components/Back";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


const Header = () => {
    const back = useSelector(state => state.interaction.back);

    //слушаем изменения в хранилище
    useEffect(() => {}, [back]);

    let history = useHistory();

    const handleClick = () => {
        history.push('/');
    };

        return (
            <header className="header">
                <div className="container">
                    <div className="header__content">
                        <Back back={back} handleBackClick={handleClick}/>
                        <Auth />
                    </div>
                </div>
            </header>
        )


}

export default Header;