import React, {Component,Fragment,useState, lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch,BrowserRouter} from 'react-router-dom';
import {transitions, positions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from "./react-alert-template";

import {Routes} from "./constants"

import "./app.scss"

const Portfolio = lazy(()=>import("./pages/Portfolio"));

const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 3000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

class App extends Component {
    render() {
        return (
            <AlertProvider template={AlertTemplate} {...options}>
                <BrowserRouter>
                    <Suspense fallback = { <div
                        style={{
                            position: "fixed",
                            top:'50%',
                            left:"50%",
                            zIndex: "100",
                            transform: "translate(-50%, -50%)",
                            color: "#a27b43"
                        }}
                    ><h1>Loading…</h1></div>
                    }>

                        <Switch>
                            <Route exact path={Routes.Home} component={Portfolio} />
                        </Switch>

                    </Suspense>
                </BrowserRouter>
            </AlertProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));