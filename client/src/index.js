import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

serviceWorker.unregister();
