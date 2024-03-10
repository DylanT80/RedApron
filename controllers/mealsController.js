const { sendQuery, checkParams } = require('../utility/queries');
const { format } = require('node-pg-format');
const { } = require('../queries/mealsQueries');

module.exports = {
    createMeal,
    getMeal,
    updateMeal,
    deleteMeal
}