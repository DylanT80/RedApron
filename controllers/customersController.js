/**
 * @description Create a customer
 * @route POST /customers
 * @private
 */
const createCustomer = async (req, res, next) => {

}

const getCustomerById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
}

module.exports = {
    createCustomer,
    getCustomerById
};