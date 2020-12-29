import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, BrowserRouter} from "react-router-dom";

import AuthorizationForm from "./components/AuthorizationForm";
import {ApiClient, ApiManager} from "./APIUsage/Authorization";
import UsersList from "./components/UsersList";

class App extends Component {
    constructor(props) {
        super(props);

        this.apiClient = new ApiClient('emphasoft-test-assignment.herokuapp.com', 80, 'http')
        this.apiManager = new ApiManager(this.apiClient)
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <AuthorizationForm manager={this.apiManager}/>
                    </Route>
                    <Route path="/userslist">
                        <UsersList manager={this.apiManager}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
