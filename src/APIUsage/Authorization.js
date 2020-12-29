import ApiError from "./ApiErrors";


class ApiClient {

    constructor(apiHost, port = 80, schema = 'http') {
        this.baseUrl = schema + "://" + apiHost + ":" + port
    }

    // Return auth token
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
                if (!response.ok) {
                    return {error: response.status === 400 ? ApiError.INVALID_CREDIT : ApiError.UNKNOWN_ERROR}
                }

                return response.json().then(jsonResponse => {
                    if ('token' in jsonResponse) {
                        return {token: jsonResponse['token']}
                    }
                    return {error: ApiError.UNKNOWN_ERROR};

                });
            })
            .catch(_ => {
                return {error: ApiError.UNKNOWN_ERROR}
            });

    }

    getUsers = (token) => {
        let path = '/api/v1/users/';
        return fetch(this.baseUrl + path, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + token
                // "Authorization": "Token 781bd9f1de084f4daa7ba2aa8a71a2eab855354e"
            }
        }).then(response => {
            const result = {
                users: undefined,
                error: undefined
            }

            if (!response.ok) {
                result.error = response.status === 401 ? ApiError.NEED_AUTH : ApiError.UNKNOWN_ERROR;
                return result
            }


            return response.json().then(users => {
                result.users = users;
                return result;
            });
        }).catch(_ => {
            return {error: ApiError.UNKNOWN_ERROR}
        });
    }
}


class ApiManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    auth = (uname, pass) => {
        return this.apiClient.auth(uname, pass)
            .then(response => {
                if ('token' in response) {
                    localStorage.setItem('token', response['token']);
                    return undefined;
                }

                // comes error
                return response.error;
            });
    }

    users = () => {
        if ('token' in localStorage && localStorage["token"]) {
            return this.apiClient.getUsers(localStorage.getItem('token'));
        }
        return Promise.resolve({error: ApiError.NEED_AUTH});
    }
}

export {ApiClient, ApiManager};
