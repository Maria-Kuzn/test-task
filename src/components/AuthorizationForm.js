import React, {Component} from 'react';
import './AuthorizationForm.css';

import InputHighlighted from "./InputHighlighted";

class AuthorizationForm extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <InputHighlighted id={"username"} type={"text"} label={"Логин"}/>
                    <InputHighlighted id={"password"} type={"password"} label={"Пароль"}/>
                    <div className="row">
                        <button>Войти</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AuthorizationForm;