const { Router } = require('express');
const usersController = require('../controllers/user');
const authorization = require('../middlewares/auth');

const usersRouter = Router();

usersRouter.get('/:id', authorization, usersController.getById);

usersRouter.get('/', authorization, usersController.getAll);

usersRouter.post('/', usersController.user);

module.exports = usersRouter;