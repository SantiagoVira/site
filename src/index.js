import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Error404 from "./components/404Error";
import HomePage from "./components/HomePage";
import FavoritePage from "./components/FavoritePage";
import AllPage from "./components/AllPage";
import MePage from "./components/MePage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/favorite" component={FavoritePage} />
            <Route path="/All" component={AllPage} />
            <Route path="/Me" component={MePage} />
            <Route component={Error404} />
        </Switch>
    </Router>,
    document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
