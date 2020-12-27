import ApiError from "./ApiErrors";

class ApiClient {


    constructor(apiHost, port = 80, schema = 'http') {
        this.baseUrl = schema + "://" + apiHost + ":" + port
    }

    // Return auth token in format 'Token <secret>'
    auth = (uname, pass) => {

        let path = '/api-token-auth/';
        let user = {
            username: uname,
            password: pass
        };

        return fetch(this.baseUrl + path, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                console.log('raw resp')
                console.log(response)
                if (!response.ok) {
                    return {error: response.status === 400 ? ApiError.INVALID_CREDIT : ApiError.UNKNOWN_ERROR}
                }

                return response.json().then(jsonResponse => {
                    if ('token' in jsonResponse) {
                        return {token: jsonResponse['token']}
                    }
                    console.log(jsonResponse)
                    console.error('There is not token in result')
                    return {error: ApiError.UNKNOWN_ERROR};

                });
            });

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

    auth = (uname, pass) => {
        return this.apiClient.auth(uname, pass)
            .then(response => {
                console.log(response)
                if ('token' in response) {
                    localStorage.setItem('token', response['token']);
                    console.log('token set');
                    return undefined;
                }

                // comes error
                console.log('error ', + response.error)
                return response.error;
            });
    }
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
