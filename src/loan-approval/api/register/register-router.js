const { registerCustomer } = require('./register-controller');

const registerRouter = require('express').Router();

registerRouter.post('/register', registerCustomer);


module.exports = registerRouter;