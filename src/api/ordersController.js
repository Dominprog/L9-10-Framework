const { readJSON, writeJSON, generateId } = require('../utils/fileUtils');
const { generateOrder } = require('../utils/randomGenerator');
const { validateTypes } = require('../utils/validator');

async function getAllOrders(req, res) {
    const orders = await readJSON('orders.json');
    res.json(orders);
}

async function getOrderById(req, res) {
    const orders = await readJSON('orders.json');
    const order = orders.find(o => o.id == req.params.id);
    order ? res.json(order) : res.status(404).json({ error: 'Заказ не найден' });
}

async function createOrder(req, res) {
    const orders = await readJSON('orders.json');
    let newOrder;
    
    if (req.body && Object.keys(req.body).length > 0) {
        if (!validateTypes(req.body)) return res.status(400).json({ error: 'Неверные типы данных' });
        newOrder = { id: generateId(orders), ...req.body };
    } else {
        newOrder = { id: generateId(orders), ...generateOrder() };
    }
    
    orders.push(newOrder);
    await writeJSON('orders.json', orders);
    res.status(201).json(newOrder);
}

async function updateOrder(req, res) {
    const orders = await readJSON('orders.json');
    const index = orders.findIndex(o => o.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Заказ не найден' });
    
    let updatedOrder;
    if (req.body && Object.keys(req.body).length > 0) {
        if (!validateTypes(req.body)) return res.status(400).json({ error: 'Неверные типы данных' });
        updatedOrder = { ...orders[index], ...req.body, id: orders[index].id };
    } else {
        updatedOrder = { ...orders[index], ...generateOrder(), id: orders[index].id };
    }
    
    orders[index] = updatedOrder;
    await writeJSON('orders.json', orders);
    res.json(updatedOrder);
}

async function patchOrder(req, res) {
    const orders = await readJSON('orders.json');
    const index = orders.findIndex(o => o.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Заказ не найден' });
    
    const order = orders[index];
    const fields = Object.keys(order).filter(key => key !== 'id');
    const randomField = fields[Math.floor(Math.random() * fields.length)];
    
    let newValue;
    if (typeof order[randomField] === 'string') newValue = `Обновлено ${Math.random().toString(36).substring(7)}`;
    else if (typeof order[randomField] === 'number') newValue = Math.floor(Math.random() * 100);
    else if (typeof order[randomField] === 'boolean') newValue = !order[randomField];
    else if (Array.isArray(order[randomField])) newValue = [...order[randomField], 'новый элемент'];
    else if (Date.parse(order[randomField])) newValue = new Date().toISOString();
    else newValue = order[randomField];
    
    const updatedOrder = { ...order, [randomField]: newValue };
    orders[index] = updatedOrder;
    await writeJSON('orders.json', orders);
    res.json(updatedOrder);
}

async function deleteOrder(req, res) {
    let orders = await readJSON('orders.json');
    const filtered = orders.filter(o => o.id != req.params.id);
    if (filtered.length === orders.length) return res.status(404).json({ error: 'Заказ не найден' });
    
    await writeJSON('orders.json', filtered);
    res.status(204).send();
}

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, patchOrder, deleteOrder };