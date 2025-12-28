class Middleware {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn);
    }

    async execute(req, res) {
        for (let middleware of this.middlewares) {
            await middleware(req, res, () => {});
        }
    }
}

module.exports = Middleware;