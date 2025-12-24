<<<<<<< HEAD
# L9-10 Framework - Система доставки еды

Минималистичный веб-фреймворк для Node.js с поддержкой маршрутизации, middleware и обработки запросов.

## Запуск
npm install
npm start

Сервер: http://localhost:3000

## API Эндпоинты

### Блюда
- GET /dishes - Все блюда
- GET /dishes/:id - Блюдо по ID
- POST /dishes - Создать блюдо
- PUT /dishes/:id - Обновить блюдо
- PATCH /dishes/:id - Частично обновить
- DELETE /dishes/:id - Удалить блюдо

### Заказы
- GET /orders - Все заказы
- GET /orders/:id - Заказ по ID
- POST /orders - Создать заказ
- PUT /orders/:id - Обновить заказ
- PATCH /orders/:id - Частично обновить
- DELETE /orders/:id - Удалить заказ

## Структура
L9-10 Framework/
├── .gitignore
├── README.md
├── package.json
├── tests/
│   └── test-all.http
├── data/
│   ├── dishes.json
│   └── orders.json
└── src/
    ├── app.js
    ├── core/
    │   ├── Application.js
    │   ├── Router.js
    │   ├── Request.js
    │   └── Response.js
    ├── middleware/
    │   └── Middleware.js
    ├── api/
    │   ├── dishesController.js
    │   └── ordersController.js
    ├── parsers/
    │   └── bodyParser.js
    └── utils/
        ├── fileUtils.js
        ├── randomGenerator.js
        └── validator.js
=======
# L9-10-Framework
>>>>>>> fef3951c18cf5a4edfb2dcfff31deb14e9d389df
