import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './UsersList.css';
import {Navbar, Button, Table} from "react-bootstrap";
import ApiError from "../APIUsage/ApiErrors";
import {Redirect} from "react-router-dom";


class UsersList extends Component {
    constructor(props) {
        super(props);
        this.manager = this.props.manager;
        this.state = {
            users: [],
            filterAppliedUsers: [],
            filter: '',
            error: '',
            logout: false
        }
        this.manager.users()
            .then(response => {

                    const {users, error} = response;

                    if (error) {
                        this.setState({
                            error: error,
                            logout: error === ApiError.NEED_AUTH
                        })
                    } else {
                        const finalUsers = users.sort(function (a, b) {
                            return a.id - b.id
                        });
                        this.setState(
                            {
                                users: finalUsers,
                                filterAppliedUsers: finalUsers
                            }
                        )
                    }

                }
            )
    };

    filterByUsername = event => {
        const filter = event.target.value;

        this.setState(
            {
                filterAppliedUsers: this.state.users.filter(user => user.username.toUpperCase().includes(filter.toUpperCase()))
            }
        )
    };

    handleLogout = () => this.setState({logout: true}, () => localStorage.setItem('token', ''));

    humanReadableError = () => {
        if (this.state.error) {
            switch (this.state.error) {
                case ApiError.NEED_AUTH:
                    return 'Пожалуйста авторизируйтесь'
                default:
                    return 'Ошибка сервера, попробуйте позже';
            }
        }
    };

    render() {
        return (
            <div>
                {
                    this.state.error &&
                    <div className='container'>
                        <h2>{this.humanReadableError()}</h2>
                    </div>
                }

                <Navbar>
                    <Button onClick={this.handleLogout} className="ml-auto btn-light">
                        Сменить пользователя
                    </Button>
                </Navbar>

                {
                    !this.state.error &&
                    <div className='col-sm-10 col-md-10 col-lg-8 content'>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Поиск по username"
                                id="filter"
                                onChange={this.filterByUsername}
                            />
                        </div>

                        <Table className='striped bordered hover table-light' id="table">
                            <thead>
                            <tr key={0}>
                                <th>id</th>
                                <th>username</th>
                                <th>first name</th>
                                <th>last name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.filterAppliedUsers.map((user, index) => {
                                    return (
                                        <tr id={user.id} key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                        </tr>
                                    )
                                }
                            )
                            }
                            </tbody>
                        </Table>
                    </div>
                }

                {
                    this.state.logout &&
                    <Redirect to='/'/>
                }

            </div>
        )
    }
}

export default UsersList