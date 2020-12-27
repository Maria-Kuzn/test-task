class ApiClient {


    constructor(apiHost, port = 80, schema = 'http') {
        this.baseUrl = schema + "://" + apiHost + ":" + port
    }

    // Return auth token in format 'Token <secret>'
    auth = (uname, pass) => {

        // let path = '/api-token-auth/';
        let user = {
            username: uname,
            password: pass
        };
        // console.log(user);

        return fetch("http://emphasoft-test-assignment.herokuapp.com/api-token-auth/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status == 401)
                        return 'Неверный логин или пароль'
                    else return 'По'
                }
                return response;
            })
            .then(response => response.json())
            .then(response => {
                return response['token'];
            })
            // todo handle exception

    }

    getUsers = (token) => {
        console.log('token is ' + token)
        return fetch("http://emphasoft-test-assignment.herokuapp.com/api/v1/users/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + token
                // "Authorization": "Token 781bd9f1de084f4daa7ba2aa8a71a2eab855354e"
            }
        })
            .then(res => res.json())
            .then(console.log)
    }
    //
    // // Return raw list of users
    // users = (authToken) => {
    //     let path = '/api/v1/users/'
    //     return fetch(
    //         this.baseUrl + path,
    //         {method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "Authorization": authToken
    //             }
    //         }
    //     ).then(res => res.json()) // todo handle errors
    //         .then(res => res.toArray());
    // }

}


class ApiManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    auth = (uname, pass) => this.apiClient.auth(uname, pass); // todo session
    users = (token) => this.apiClient.getUsers(token);

    // users = (sorting, filters) => {
    //     // if (auth not in session) {
    //     //     error;
    //     // }
    //
    //     users = this.apiClient.users(session[token])
    //
    //     users = filter(filters, users)
    //     return sort(sorting, users);
    // }
}

export {ApiClient, ApiManager};
