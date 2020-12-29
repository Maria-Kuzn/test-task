import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './AuthorizationForm.css';
import ApiError from "../APIUsage/ApiErrors";
import {Link, Router, Redirect} from 'react-router-dom';


class AuthorizationForm extends Component {
    constructor(props) {
        super(props);
        this.manager = props.manager;
        this.state = {
            username: 'test_super',
            password: 'Nf<U4f<rDbtDxAPn',
            highlightUsername: false,
            highlightPassword: false,
            usernameError: '',
            passwordError: '',
            redirect: this.hasAuthToken()
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
        return username.match(/^[\w+\-@_.]+$/) ? '' : 'Недопустимые символы';
    }

    getPasswordErrors = (password) => {
        if (!password || password.length < 1) return "Введите пароль";
        return '';
    }

    getValidActualState = () => {
        const {username, password} = this.state;

        const exists = (s) => !!s

        const passError = this.getPasswordErrors(password);
        const userError = this.getUsernameErrors(username);

        return {
            usernameError: userError,
            passwordError: passError,
            highlightPassword: exists(passError),
            highlightUsername: exists(userError)
        }
    }

    validateUsername = () => {
        const {username} = this.state;
        const error = this.getUsernameErrors(username);
        this.setState({
            usernameError: error,
            highlightUsername: error !== ''
        });
    }

    validatePassword = (callback) => {
        const {password} = this.state;
        const error = this.getPasswordErrors(password);
        let newstate = {
            passwordError: error,
            highlightPassword: error !== ''
        }
        console.log('set new state', newstate)
        this.setState(newstate);
    }

    isValidState = () => {
        console.log(this.state)
        this.validateUsername();
        this.validatePassword();
        console.log(this.state)
        // console.log(this.state);
        return this.state.username && this.state.password && !this.state.passwordError && !this.state.usernameError;
    }

    hasAuthToken = () => {
        return localStorage.getItem('token');
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState(this.getValidActualState(), () => {
            if (this.isValidState()) {
                this.manager.auth(this.state.username, this.state.password)
                    .then(error => {
                        if (error) {
                            let new_state = {
                                passwordError: '',
                                highlightUsername: false,
                                highlightPassword: false
                            }
                            switch (error) {
                                case ApiError.INVALID_CREDIT:
                                    new_state.passwordError = 'Неверный логин или пароль';
                                    new_state.highlightPassword = true;
                                    new_state.highlightUsername = true;
                                    break;
                                default:
                                    new_state.passwordError = 'Ошибка сервера. Пожалуйста, повторите позже';
                                    break
                            }
                            this.setState(new_state);
                        } else {
                            this.setState({redirect: true})
                        }

                    })
            }
        });


    };


    render() {
        return (

            <form className="container" onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='username'>Логин</label>
                    <input
                        name='username'
                        className={`form-control ${this.state.highlightUsername ? 'is-invalid' : ''}`}
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
                        className={`form-control ${this.state.highlightPassword ? 'is-invalid' : ''}`}
                        id='password'
                        placeholder='Введите пароль'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        onBlur={this.validatePassword}
                    />
                    <div
                        className={`invalid-feedback ${this.state.passwordError !== '' ? 'd-block' : ''}`}>{this.state.passwordError}</div>
                </div>
                <button type='submit' className='btn btn-dark btn-block'>
                    Войти
                </button>
                {
                    this.state.redirect &&
                    <Redirect to='/userslist'/>
                }
            </form>
        );
    }
}

export default AuthorizationForm;