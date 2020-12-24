import React, {Component} from 'react';
import './Authorization_form.css';

class Authorization_form extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <div className="row">
                        <label htmlFor="username">Логин</label>
                        <input type="text" id="username" name="username"/>
                    </div>
                    <div className="row">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" name="password"/>
                    </div>
                    <div className="row">
                        <input type="button" value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Authorization_form;