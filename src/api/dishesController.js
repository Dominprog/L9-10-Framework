const { readJSON, writeJSON, generateId } = require('../utils/fileUtils');
const { generateDish } = require('../utils/randomGenerator');
const { validateTypes } = require('../utils/validator');

async function getAllDishes(req, res) {
    const dishes = await readJSON('dishes.json');
    res.json(dishes);
}

async function getDishById(req, res) {
    const dishes = await readJSON('dishes.json');
    const dish = dishes.find(d => d.id == req.params.id);
    dish ? res.json(dish) : res.status(404).json({ error: 'Блюдо не найдено' });
}

async function createDish(req, res) {
    const dishes = await readJSON('dishes.json');
    let newDish;
    
    if (req.body && Object.keys(req.body).length > 0) {
        if (!validateTypes(req.body)) return res.status(400).json({ error: 'Неверные типы данных' });
        newDish = { id: generateId(dishes), ...req.body };
    } else {
        newDish = { id: generateId(dishes), ...generateDish() };
    }
    
    dishes.push(newDish);
    await writeJSON('dishes.json', dishes);
    res.status(201).json(newDish);
}

async function updateDish(req, res) {
    const dishes = await readJSON('dishes.json');
    const index = dishes.findIndex(d => d.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Блюдо не найдено' });
    
    let updatedDish;
    if (req.body && Object.keys(req.body).length > 0) {
        if (!validateTypes(req.body)) return res.status(400).json({ error: 'Неверные типы данных' });
        updatedDish = { ...dishes[index], ...req.body, id: dishes[index].id };
    } else {
        updatedDish = { ...dishes[index], ...generateDish(), id: dishes[index].id };
    }
    
    dishes[index] = updatedDish;
    await writeJSON('dishes.json', dishes);
    res.json(updatedDish);
}

async function patchDish(req, res) {
    const dishes = await readJSON('dishes.json');
    const index = dishes.findIndex(d => d.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Блюдо не найдено' });
    
    const dish = dishes[index];
    const fields = Object.keys(dish).filter(key => key !== 'id');
    const randomField = fields[Math.floor(Math.random() * fields.length)];
    
    let newValue;
    if (typeof dish[randomField] === 'string') newValue = `Обновлено ${Math.random().toString(36).substring(7)}`;
    else if (typeof dish[randomField] === 'number') newValue = Math.floor(Math.random() * 100);
    else if (typeof dish[randomField] === 'boolean') newValue = !dish[randomField];
    else if (Array.isArray(dish[randomField])) newValue = [...dish[randomField], 'новый элемент'];
    else if (Date.parse(dish[randomField])) newValue = new Date().toISOString();
    else newValue = dish[randomField];
    
    const updatedDish = { ...dish, [randomField]: newValue };
    dishes[index] = updatedDish;
    await writeJSON('dishes.json', dishes);
    res.json(updatedDish);
}

async function deleteDish(req, res) {
    let dishes = await readJSON('dishes.json');
    const filtered = dishes.filter(d => d.id != req.params.id);
    if (filtered.length === dishes.length) return res.status(404).json({ error: 'Блюдо не найдено' });
    
    await writeJSON('dishes.json', filtered);
    res.status(204).send();
}

module.exports = { getAllDishes, getDishById, createDish, updateDish, patchDish, deleteDish };