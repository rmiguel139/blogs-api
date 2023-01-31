const { Router } = require('express');
const postsController = require('../controllers/posts');
const authorization = require('../middlewares/auth');

const postsRouter = Router();

postsRouter.post('/', authorization, postsController.createPost);

module.exports = postsRouter;