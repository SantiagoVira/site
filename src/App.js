import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

import Home from "./components/Home/Home";
import Error404 from "./components/Error404/Error404";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/favorite" component={Home} />
                <Route path="/All" component={Home} />
                <Route path="/Games" component={Home} />
                <Route path="/Me" component={Home} />
                <Route component={Error404} />
            </Switch>
        </Router>
    );
}

export default App;
