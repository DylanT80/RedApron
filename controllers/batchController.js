const { sendQuery, checkParams } = require('../utility/queries');
const { format } = require('node-pg-format');
const {
    createBatchQuery,
    createBatchIngredientQuery,
    getBatchQuery,
    getBatchIngredientQuery,
    updateBatchQuery,
    deleteBatchQuery,
    deleteBatchIngredientQuery
} = require('../queries/batchQueries');
const { getNumBatchesInIntervalQuery } = require('../queries/highLevelQueries');
const { updateIngredientQuery, getIngredientQuery } = require('../queries/ingredientsQueries');

const createBatch = async (req, res, next) => {
    const { BatchNumber, VendorName, Items } = req.body;

    if (checkParams([BatchNumber, VendorName, Items])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        // Create Batch
        const output = await sendQuery(createBatchQuery, [BatchNumber, VendorName]);
        const BatchID = output.rows[0]['id'];

        // Create Batch Items
        Items.forEach(async (item) => {
            const IngredientName = Object.keys(item)[0];
            const Quantity = item[IngredientName];
            
            // Update stock count of ingredients
            const ingredient = await sendQuery(getIngredientQuery, [IngredientName]);
            const formattedQuery = format(updateIngredientQuery, 'CurrentAmount');
            await sendQuery(formattedQuery, [ingredient.rows[0]['currentamount'] + Quantity, IngredientName]);

            await sendQuery(createBatchIngredientQuery, [IngredientName, BatchID, Quantity]);
        });

        res.status(201).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getBatch = async (req, res, next) => {
    const { batchnumber } = req.query;

    if (checkParams([batchnumber])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        const batch = await sendQuery(getBatchQuery, [batchnumber]);
        const batchItems = await sendQuery(getBatchIngredientQuery, [batchnumber]);

        const output = { Batch: batch.rows[0], Items: [] };
        batchItems.rows.forEach(row => {
            output['Items'] = [...output['Items'], row];
        });
        res.status(200).send(output);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateBatch = async (req, res, next) => {
    const { column, value, batchnumber } = req.query;

    if (checkParams([column, value, batchnumber])) {
        res.status(401).send('Params missing');
        return;
    }

    const formattedQuery = format(updateBatchQuery, column);
    try {
        const output = await sendQuery(formattedQuery, [value, batchnumber]);
        res.status(200).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteBatch = async (req, res, next) => {
    const { batchnumber } = req.query;

    if (checkParams([batchnumber])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        // Delete order
        await sendQuery(deleteBatchIngredientQuery, [batchnumber])
        // Delete order items
        await sendQuery(deleteBatchQuery, [batchnumber]);
        res.status(201).send('Deletion successful!');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getNumBatchesInInterval = async (req, res, next) => {
    const { startDate, endDate } = req.query;

    if (checkParams([startDate, endDate])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        const output = await sendQuery(getNumBatchesInIntervalQuery, [startDate, endDate]);
        res.status(200).send({ Count: output.rowCount, Batches: output.rows} );
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    createBatch,
    getBatch,
    updateBatch,
    deleteBatch,
    getNumBatchesInInterval
}