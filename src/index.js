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
      <Route
        exact
        path="/"
        component={HomePage}
        onEnter={() => light("Home")}
      />
      <Route path="/home" component={HomePage} onEnter={() => light("Home")} />
      <Route
        path="/favorite"
        component={FavoritePage}
        onEnter={() => light("Favorite")}
      />
      <Route path="/All" component={AllPage} onEnter={() => light("All")} />
      <Route path="/Me" component={MePage} onEnter={() => light("Me")} />
      <Route component={Error404} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
function light(val) {
  document.getElementById("NavBar").setState({ value: val });
}
//After Router path='Me'
//<Route component={Error404} />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
