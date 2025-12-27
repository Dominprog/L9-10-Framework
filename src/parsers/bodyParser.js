function bodyParser(req) {
    return new Promise((resolve) => {
        if (req.method === 'GET' || req.method === 'DELETE') {
            req.body = {};
            return resolve();
        }
        
        let body = '';
        req.req.on('data', chunk => body += chunk.toString());
        req.req.on('end', () => {
            try {
                req.body = body ? JSON.parse(body) : {};
                resolve();
            } catch {
                req.body = {};
                resolve();
            }
        });
    });
}

module.exports = bodyParser;