import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './AuthorizationForm.css';


class AuthorizationForm extends React.Component {
    constructor(props) {
        super(props);
        this.manager = props.manager;
        this.state = {
            username: 'test_super',
            password: 'Nf<U4f<rDbtDxAPn',
            usernameError: '',
            passwordError: ''
        };
    }

    handleUsernameChange = event => {
        console.log('handle username change')
        this.setState({username: event.target.value}, () =>
            this.validateUsername());
    };

    handlePasswordChange = event => {
        this.setState({password: event.target.value}, () => {
            this.validatePassword();
        });
    };

    // Contract
    // Returns human readable error on input name or null if it's correct
    getUsernameErrors = (username) => {
        if (!username || username.length < 1 || username.length > 150) {
            return "Имя пользователя должно содержать от 1 до 150 символов";
        }
        return username.match(/^[\w+\-@_.]+$/) ? null : 'Недопустимые символы';
    }

    getPasswordErrors = (password) => {
        if (!password || password.length < 1) return "Введите пароль"
    }

    validateUsername = () => {
        const {username} = this.state;
        this.setState({
            usernameError: this.getUsernameErrors(username)
        });
    }

    validatePassword = () => {
        const {password} = this.state;
        this.setState({
            passwordError:
                this.getPasswordErrors(password)
        });
    }

    isValidState = () => {
        this.validateUsername();
        this.validatePassword();
        // console.log(this.state);
        return this.state.username && this.state.password && !this.state.passwordError && !this.state.usernameError;
    }

    handleSubmit = event => {
        event.preventDefault();
        const {username, password} = this.state;
        if (this.isValidState()) {
            this.manager.auth(this.state.username, this.state.password)
                .then(token => {
                    localStorage.setItem('token', token);
                })

        }
    };

    handleSubmit1 = event => {
        event.preventDefault();
        const {username, password} = this.state;
        if (username === 'ihs') {
            this.manager.users(localStorage.getItem('token'))
        } else {
            this.handleSubmit(event);
        }

    };


    render() {
        return (

            <form className="container" onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='username'>Логин</label>
                    <input
                        name='username'
                        className={`form-control ${this.state.usernameError ? 'is-invalid' : ''}`}
                        id='username'
                        placeholder='Введите логин'
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        onBlur={this.validateUsername}
                    />
                    <div className='invalid-feedback'>{this.state.usernameError}</div>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Пароль</label>
                    <input
                        type='password'
                        name='password'
                        className={`form-control ${this.state.passwordError ? 'is-invalid' : ''}`}
                        id='password'
                        placeholder='Введите пароль'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        onBlur={this.validatePassword}
                    />
                    <div className='invalid-feedback'>{this.state.passwordError}</div>
                </div>
                <button type='submit' className='btn btn-dark btn-block'>
                    Войти
                </button>
            </form>
        );
    }
}

export default AuthorizationForm;