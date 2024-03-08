const getCustomerById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
}

module.exports = {
    getCustomerById
};