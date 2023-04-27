class HTTPRequest {
    constructor(){
        this.url = 'https://backend-dummy.hospitaldeespecialidades.com.sv/api'
        this.token = JSON.parse(localStorage.getItem('token'))
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }
    }

    async get(endpoint){
        console.log(this.defaultHeaders)
        return fetch(`${this.url}/${endpoint}`, { method: 'GET', headers: this.defaultHeaders }).then(response => response.json())
    }
}

export default new HTTPRequest()