const serverURL = 'http://localhost/api'

class API {
    constructor () {
        this.token = null
    }
    _buildHeaders () {
        if (this.token) {
            return {
                'x-access-token': this.token,
                'Content-Type': 'application/json'
            }
        }
        return {
            'Content-Type': 'application/json'
        }
    }
    get (path) {
        return new Promise((resolve, reject) => {
            fetch(`${serverURL}${path}`, {
                headers: this._buildHeaders()
            })
            .then(res =>{ 
                if (!res.ok) {
                    res.json().then(reject)
                }
                else {
                    res.json()
                    .then(resolve)
                }
            })
        })
    }

    post (path, payload) {
        return new Promise((resolve, reject) => {
            return fetch(`${serverURL}${path}`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: this._buildHeaders()
            })
            .then(res =>{ 
                if (!res.ok) {
                    res.json().then(reject)
                }
                else {
                    res.json()
                    .then(resolve)
                }
            })
        })
    }

    put (path, payload) {
        return new Promise((resolve, reject) => {
            return fetch(`${serverURL}${path}`, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: this._buildHeaders()
            })
            .then(res =>{ 
                if (!res.ok) {
                    res.json().then(reject)
                }
                else {
                    res.json()
                    .then(resolve)
                }
            })
        })
    }

    delete (path) {
        return new Promise((resolve, reject) => {
            fetch(`${serverURL}${path}`, {
                headers: this._buildHeaders(),
                method: 'DELETE'
            })
            .then(res =>{ 
                if (!res.ok) {
                    res.json().then(reject)
                }
                else {
                    res.json()
                    .then(resolve)
                }
            })
        })
    }

    setToken (token) {
        this.token = token
    }

}

let api = new API()

export default api
