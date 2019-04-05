import React from 'react';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {Home} from "../../pages/Home/home.jsx";
import {DemoCount} from "../../pages/DemoCount/demoCount.jsx";
import classes from './App.css';
import {Color} from "../../pages/Color/Color.jsx";
import {ColorShow} from "../../pages/ColorShow/ColorShow.jsx";
import {Twitter} from "../../pages/Twitter/Twitter.jsx";
import {Memory} from "../../pages/Memory/Memory.jsx";

export class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <nav className={classes.nav}>
                            <ul>
                                <li>
                                    <NavLink to="/" exact={true} activeClassName={classes.active}>
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/count" activeClassName={classes.active}>
                                        Count
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/colors" activeClassName={classes.active}>
                                        Color
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/twitter" activeClassName={classes.active}>
                                        Twitter
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/memory" activeClassName={classes.active}>
                                        Memory
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                        <Route path="/" exact={true} component={Home}/>
                        <Route path="/count" component={DemoCount}/>
                        <Route path="/colors" exact={true} component={Color}/>
                        <Route path="/color/:key" component={ColorShow}/>
                        <Route path="/twitter" component={Twitter}/>
                        <Route path="/memory" component={Memory}/>
                    </div>
                </Router>
            </div>
        );
    }
}
