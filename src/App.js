import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import AuthorizationForm from "./components/AuthorizationForm";

class App extends Component{
  render() {
    return(
        <AuthorizationForm/>
    )
  }
}

export default App;
