import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Table} from "react-bootstrap";

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.manager = this.props.manager;
        this.state = {
            users: []
        }
        this.manager.users(localStorage['token'])
            .then(users => this.setState({users: users}, () => console.log('got users', this.state.users)))

    }

    getUsers = () => {

    }


    render() {
        return (
            <div>
                <Table className='striped bordered hover table-light'>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>first name</th>
                        <th>last name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.slice(0, 25).map((user, index) => {
                        return (
                            <tr>
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
        )
    }
}

export default UsersList