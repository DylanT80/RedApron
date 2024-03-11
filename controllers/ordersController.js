const { sendQuery, checkParams } = require('../utility/queries');
const { format } = require('node-pg-format');
const { 
    createOrderQuery, 
    createOrderItemQuery,
    getOrderQuery,
    getOrderItemQuery,
    updateOrderQuery, 
    deleteOrderQuery, 
    deleteOrderItemQuery, 
    linkIngredientsQuery
} = require('../queries/ordersQueries');
const { getCustomerQuery, getCustomerPlanQuery } = require('../queries/customersQueries');
const { listActiveOrders } = require('../queries/highLevelQueries');

const createOrder = async (req, res, next) => {
    const { OrderNumber, Email, Items } = req.body;
    
    if (checkParams([OrderNumber, Email, Items])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        // Create Order
        const output = await sendQuery(createOrderQuery, [OrderNumber, Email]);
        const OrderID = output.rows[0]['id'];

        // Create OrderItems
        Items.forEach(async (item) => {
            const MealKitSKU = Object.keys(item)[0];
            const Quantity = item[MealKitSKU];

            // Update stock and check if available
            const PortionSize = (await sendQuery(getCustomerPlanQuery, [Email])).rows[0]['portionsize'];
            const LinkedIngredients = await sendQuery(linkIngredientsQuery, [MealKitSKU]);
            LinkedIngredients.rows.forEach(async row => {
                const currentAmount = row['currentamount'];
                const amountNeeded = PortionSize * row['quantity'];

                if (amountNeeded > currentAmount) {
                    res.status(200).send('Out of stock!');
                    return;
                }
                
                // Update stock number
                const newAmount = currentAmount - amountNeeded;
                const query = "UPDATE Ingredient SET currentamount = $1 WHERE Ingredient.name = $2";
                const values = [newAmount, row['name']];

                await sendQuery(query, values);
            });

            await sendQuery(createOrderItemQuery, [OrderID, MealKitSKU, Quantity]);
        });

        res.status(201).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getOrder = async (req, res, next) => {
    const { ordernumber } = req.query;

    if (checkParams([ordernumber])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        const order = await sendQuery(getOrderQuery, [ordernumber]);
        const orderItems = await sendQuery(getOrderItemQuery, [ordernumber]);

        const output = { Order: order.rows[0], Items: [] };
        orderItems.rows.forEach(row => {
            output['Items'] = [...output['Items'], row];
        });
        res.status(200).send(output);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateOrder = async (req, res, next) => {
    const { column, value, ordernumber } = req.query;

    if (checkParams([column, value, ordernumber])) {
        res.status(401).send('Params missing');
        return;
    }

    const formattedQuery = format(updateOrderQuery, column);
    try {
        const output = await sendQuery(formattedQuery, [value, ordernumber]);
        res.status(200).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteOrder = async (req, res, next) => {
    const { ordernumber } = req.query;

    if (checkParams([ordernumber])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        // Delete order items
        await sendQuery(deleteOrderItemQuery, [ordernumber])
        // Delete order
        await sendQuery(deleteOrderQuery, [ordernumber]);
        res.status(201).send('Deletion successful!');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

/**
 * @description Gets the order number and status of active orders
 * @route GET /orders/HL/1
 * @public
 */
const getActiveOrders = async (req, res, next) => {
    try {
        const output = await sendQuery(listActiveOrders, []);
        res.status(201).send(output.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getActiveOrders
}