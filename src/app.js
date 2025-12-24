const Application = require('./core/Application');
const bodyParser = require('./parsers/bodyParser');

const dishesController = require('./api/dishesController');
const ordersController = require('./api/ordersController');

const app = new Application();

app.use(async (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    await next();
});

app.use(async (req, res, next) => {
    await bodyParser(req);
    await next();
});

app.get('/', (req, res) => {
    res.json({ 
        message: 'API Доставки еды',
        endpoints: {
            dishes: {
                get_all: 'GET /dishes',
                get_one: 'GET /dishes/:id',
                create: 'POST /dishes',
                update: 'PUT /dishes/:id',
                partial_update: 'PATCH /dishes/:id',
                delete: 'DELETE /dishes/:id'
            },
            orders: {
                get_all: 'GET /orders',
                get_one: 'GET /orders/:id',
                create: 'POST /orders',
                update: 'PUT /orders/:id',
                partial_update: 'PATCH /orders/:id',
                delete: 'DELETE /orders/:id'
            }
        }
    });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/dishes', dishesController.getAllDishes);
app.get('/dishes/:id', dishesController.getDishById);
app.post('/dishes', dishesController.createDish);
app.put('/dishes/:id', dishesController.updateDish);
app.patch('/dishes/:id', dishesController.patchDish);
app.delete('/dishes/:id', dishesController.deleteDish);

app.get('/orders', ordersController.getAllOrders);
app.get('/orders/:id', ordersController.getOrderById);
app.post('/orders', ordersController.createOrder);
app.put('/orders/:id', ordersController.updateOrder);
app.patch('/orders/:id', ordersController.patchOrder);
app.delete('/orders/:id', ordersController.deleteOrder);

const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

module.exports = app;