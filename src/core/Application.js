const http = require('http');
const Router = require('./Router');
const Request = require('./Request');
const Response = require('./Response');

class Application {
    constructor() {
        this.router = new Router();
        this.middlewares = [];
    }

    get(path, handler) { this.router.addRoute('GET', path, handler); }
    post(path, handler) { this.router.addRoute('POST', path, handler); }
    put(path, handler) { this.router.addRoute('PUT', path, handler); }
    patch(path, handler) { this.router.addRoute('PATCH', path, handler); }
    delete(path, handler) { this.router.addRoute('DELETE', path, handler); }

    use(middleware) { this.middlewares.push(middleware); }

    async handleRequest(req, res) {
        const request = new Request(req);
        const response = new Response(res);

        try {
            for (let middleware of this.middlewares) {
                await middleware(request, response, () => {});
            }

            const route = this.router.findRoute(req.method, req.url);
            if (route) {
                request.params = route.params;
                await route.handler(request, response);
            } else {
                response.status(404).json({ error: 'Not Found' });
            }
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    listen(port, callback) {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(port, callback);
        return server;
    }
}

module.exports = Application;