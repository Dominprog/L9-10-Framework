const { URL } = require('url');

class Request {
    constructor(req) {
        this.req = req;
        this.method = req.method;
        this.url = req.url;
        
        try {
            const base = `http://${req.headers.host || 'localhost'}`;
            const urlObj = new URL(req.url, base);
            this.query = Object.fromEntries(urlObj.searchParams);
        } catch {
            this.query = {};
        }
        
        this.params = {};
        this.body = null;
    }
}

module.exports = Request;