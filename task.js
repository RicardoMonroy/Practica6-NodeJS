const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database');

class Task extends Model { }

Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'Tasks'
});

module.exports = Task;
