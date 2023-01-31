const { Router } = require('express');
const categoriesController = require('../controllers/categorie');
const authorization = require('../middlewares/auth');

const categoriesRouter = Router();

categoriesRouter.get('/', authorization, categoriesController.getAll);

categoriesRouter.post('/', authorization, categoriesController.createCategorie);

module.exports = categoriesRouter;
