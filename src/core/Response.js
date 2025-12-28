class Response {
    constructor(res) {
        this.res = res;
    }

    status(code) {
        this.res.statusCode = code;
        return this;
    }

    send(data) {
        this.res.end(data);
    }

    json(data) {
        this.res.setHeader('Content-Type', 'application/json');
        this.res.end(JSON.stringify(data));
    }
}

module.exports = Response;