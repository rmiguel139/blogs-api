const loginService = require('../services/login');
const userService = require('../services/user');

const loginController = {
    /** @type {import('express').RequestHandler} */
     login: async (req, res) => {
        const body = await loginService.validation(req.body);
        const user = await userService.userByEmail(body);
        const token = await loginService.generateToken(user);
        res.status(200).send({ token });
    },
};

module.exports = loginController;
