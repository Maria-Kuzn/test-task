import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './UsersList.css';
import {Table} from "react-bootstrap";
import ApiError from "../APIUsage/ApiErrors";

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.manager = this.props.manager;
        this.state = {
            users: [],
            userToShow: [],
            filter: '',
            errors: ''
        }
        this.manager.users()
            .then(response => {

                const {users, error} = response;
                console.log('users', users);
                console.log('error', error);

                if (!!error) {
                    console.log(error)
                    switch (error) {
                        case ApiError.INVALID_CREDIT:
                            return (<h1>Not auth</h1>) // redirect login
                        default:
                            return (<h1>'Server error. Please try again later.'</h1>);

                    }
                } else {
                    console.log('users', users);
                    const finalUsers = users.sort(function (a, b) {
                        return a.id - b.id
                    });
                    this.setState(
                        {
                            users: finalUsers,
                            userToShow: finalUsers
                        }
                    )
                }

            })
    };

    filterByUsername = event => {
        const filter = event.target.value;

        this.setState(
            {
                userToShow: this.state.users.filter(user => user.username.includes(filter))
            }
        )
    };


    render() {
        return (
            <div>
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
                        <tr>
                            <th>id</th>
                            <th>username</th>
                            <th>first name</th>
                            <th>last name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.userToShow.slice(0, 25).map((user, index) => {
                            return (
                                <tr id={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                </tr>)
                        })
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UsersList