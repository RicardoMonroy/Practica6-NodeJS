require('dotenv').config();
const express = require('express');
const Task = require('./task');
const sequelize = require('./database');

const app = express();
const port = process.env.PORT || 3000;

sequelize.sync();

app.use(express.json());

// Crear tarea
app.post('/tasks', async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
});

// Leer tarea
app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

// Actuializar tarea
app.put('/task/:id', async (req, res) => {
    const affectedRows = await Task.update(req.body, { where: { id: req.params.id } });
    res.json({ message: `Changed ${affectedRows} row(s)` });
});

// Eliminar tarea
app.delete('/tasks/:id', async (req, res) => {
    const deletedRows = await Task.destroy({ where: { id: req.params.id } });
    res.json({ message: `Deleted ${deletedRows} row(s)` });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;