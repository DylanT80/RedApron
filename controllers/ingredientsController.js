const { sendQuery, checkParams } = require('../utility/queries');
const { format } = require('node-pg-format');
const { createIngredientQuery, getIngredientQuery, updateIngredientQuery, deleteIngredientQuery } = require('../queries/ingredientsQueries');

/**
 * @description Create an ingredient
 * @route POST /ingredients
 * @public
 */
const createIngredient = async (req, res, next) => {
       // Assumes we have all fields, validated on client side
       const { Name, Expiration, CurrentAmount, MinimumAmount } = req.body;

       if (checkParams([Name, Expiration, CurrentAmount, MinimumAmount])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        const output = await sendQuery(createIngredientQuery, [Name, Expiration, CurrentAmount, MinimumAmount]);
        res.status(201).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

/**
 * @description Get an ingedient
 * @route GET /ingredients?name=_
 * @public
 */
const getIngredient = async (req, res, next) => {
    const { name } = req.query;
    
    if(checkParams([name])){
        res.status(401).send('Params missing');
        return;
    }

    try {
        const output = await sendQuery(getIngredientQuery, [name]);
        res.status(201).send(output.rows[0]); 
    } catch (error) {
        console.error(error);
        next(error);
    }
}

/**
 * @description Update an ingredient
 * @route PUT /ingredients?column=_&value=_&name=_
 * @public
 */
const updateIngredient = async(req, res, next) => {
    const {column, value, name} = req.query;

    if (checkParams([column, value, name])) {
        res.status(401).send('Params missing');
        return;
    }

    const formattedQuery = format(updateIngredientQuery, column);
    try {
        const output = await sendQuery(formattedQuery, [value, name]);
        res.status(200).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

/**
 * @description Delete an ingredient
 * @route DELETE /ingredients?name=_
 * @public
 */
const deleteIngredient = async (req, res, next) => {
    const { name } = req.query;

    if (checkParams([name])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        await sendQuery(deleteIngredientQuery, [name]);
        res.status(204).send('Deletion successful!');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    createIngredient,
    getIngredient,
    updateIngredient,
    deleteIngredient
}