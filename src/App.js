import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import React from "react";
import { createBrowserHistory } from "history";

import Home from "./components/Home/Home";
import Error404 from "./components/Error404/Error404";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Projects from "./components/Projects/Projects";

function App() {
    const history = createBrowserHistory();
    return (
        <div className="App">
            <Menu history={history} />
            <div className="content">
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/projects/" component={Projects} />
                        <Route path="/resume" component={Projects} />
                        <Route component={Error404} />
                    </Switch>
                </Router>
            </div>

            <Footer />
        </div>
    );
}

export default App;
