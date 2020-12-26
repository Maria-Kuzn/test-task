class ApiClient {


    constructor(apiHost, port=80, schema='http') {
        this.baseUrl = schema + "://" + apiHost + ":" + port
    }

    // // Return auth token in format 'Token <secret>'
    // auth = (uname, pass) => {
    //
    //     let path = '/api-token-auth/';
    //
    //
    //     return fetch(
    //         this.baseUrl + path,
    //         {
    //             body: {
    //                 username: uname,
    //                 password: pass
    //             },
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             }
    //         }
    //     ).then(res => res.json()) // todo handle errors
    //         .then(res => res.token)
    //
    // }
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

    // auth = (uname, pass) => this.apiClient.auth(uname, pass); // todo session
    //
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
