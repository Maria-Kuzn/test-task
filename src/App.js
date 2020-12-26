import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import AuthorizationForm from "./components/AuthorizationForm";
import {ApiClient, ApiManager} from "./APIUsage/Authorization"

class App extends Component{
  constructor(props) {
    super(props);

    this.apiClient = new ApiClient('emphasoft-test-assignment.herokuapp.com', 80, 'http')
    this.apiManager = new ApiManager(this.apiClient)
  }

  render() {
    return(
        <AuthorizationForm manager={this.apiManager}/>
    )
  }
}

export default App;
