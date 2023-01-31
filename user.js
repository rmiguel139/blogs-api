const loginService = require('../services/login');
const userService = require('../services/user');

const userController = {
  /** @type {import('express').RequestHandler} */
    user: async (req, res) => {
        const body = await userService.validateUser(req.body);
        await userService.checkEmail(body.email);
        const newUser = await userService.createUser(body);
        const token = await loginService.generateToken(newUser);
        res.status(201).json({ token });
    },
    /** @type {import('express').RequestHandler} */
    getAll: async (_req, res) => {
      const users = await userService.getAll();
      res.status(200).json(users);
    },
  /** @type {import('express').RequestHandler} */
    getById: async (req, res) => {
      const user = await userService.getById(req.params.id);
      res.status(200).json(user);
    },
};

module.exports = userController;