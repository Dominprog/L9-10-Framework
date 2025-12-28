class Router {
    constructor() {
        this.routes = {
            GET: [], POST: [], PUT: [], PATCH: [], DELETE: []
        };
    }

    addRoute(method, path, handler) {
        this.routes[method].push({ path, handler });
    }

    findRoute(method, url) {
        const urlPath = url.split('?')[0];
        const routes = this.routes[method] || [];

        for (let route of routes) {
            const params = {};
            const routeParts = route.path.split('/');
            const urlParts = urlPath.split('/');

            if (routeParts.length !== urlParts.length) continue;

            let match = true;
            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i].startsWith(':')) {
                    const paramName = routeParts[i].slice(1);
                    params[paramName] = urlParts[i];
                } else if (routeParts[i] !== urlParts[i]) {
                    match = false;
                    break;
                }
            }

            if (match) return { ...route, params };
        }

        return null;
    }
}

module.exports = Router;