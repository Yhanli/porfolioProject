import React, {Component,Fragment,useState, lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch,BrowserRouter} from 'react-router-dom';



class App extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    this is content
                </div>
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));