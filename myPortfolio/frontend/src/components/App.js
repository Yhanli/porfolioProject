import React, {Component,Fragment,useState, lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch,BrowserRouter} from 'react-router-dom';

import {Routes} from "./constants"

import "./app.scss"

const Portfolio = lazy(()=>import("./pages/Portfolio"));

class App extends Component {
    render() {
        return (
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
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));