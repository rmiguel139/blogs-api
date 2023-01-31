const categoriesService = require('../services/categorie');

const categoriesController = {
  createCategorie: async (req, res) => {
    const validate = await categoriesService.validateCategorie(req.body);
    const createCategory = await categoriesService.createCategorie(validate);
    res.status(201).send(createCategory);
  },

  getAll: async (_req, res) => {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  },
};

module.exports = categoriesController;