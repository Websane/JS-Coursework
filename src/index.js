import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from "./App";
import store from "./store";
import 'normalize.css';

const app = (
    <Provider store={store}>
        <h1 className="visually-hidden">Фотографии со всего света Relax View</h1>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
