function randomString(length = 5) {
    return Math.random().toString(36).substring(2, 2 + length);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBoolean() { return Math.random() > 0.5; }
function randomDate() { return new Date(Date.now() - Math.random() * 1e10).toISOString(); }

function randomArray() {
    return Array.from({ length: randomNumber(1, 5) }, () => randomString());
}

function generateDish() {
    return {
        name: `Блюдо ${randomString()}`,
        description: `Описание ${randomString(10)}`,
        price: randomNumber(5, 50),
        category: ['Пицца', 'Бургер', 'Суши'][randomNumber(0, 2)],
        isAvailable: randomBoolean(),
        ingredients: randomArray(),
        cookingTime: randomNumber(10, 60),
        spicyLevel: randomNumber(0, 5),
        createdAt: randomDate(),
        tags: randomArray()
    };
}

function generateOrder() {
    return {
        customerName: `Клиент ${randomString()}`,
        phone: `+7${randomNumber(1000000000, 9999999999)}`,
        email: `${randomString()}@mail.com`,
        address: `Адрес ${randomString()}`,
        dishes: Array.from({ length: randomNumber(1, 3) }, () => ({
            dishId: randomNumber(1, 10),
            quantity: randomNumber(1, 5)
        })),
        totalAmount: randomNumber(100, 1000),
        status: ['ожидает', 'готовится', 'доставляется'][randomNumber(0, 2)],
        paymentMethod: ['наличные', 'карта'][randomNumber(0, 1)],
        deliveryTime: randomDate(),
        notes: `Примечание ${randomString()}`,
        createdAt: randomDate(),
        isPaid: randomBoolean(),
        rating: randomBoolean() ? randomNumber(1, 5) : null
    };
}

module.exports = { generateDish, generateOrder };