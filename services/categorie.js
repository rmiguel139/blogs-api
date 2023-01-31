const Joi = require('joi');
const models = require('../database/models');
const errors = require('./errors');

const categoriesService = {
  createCategorie: async (body) => {
    const newCategory = await models.Category.create(body, { raw: true });
    return newCategory;
  },

  getAll: async () => {
    const categories = await models.Category.findAll({ raw: true });
    return categories;
  },

  verifyCategories: async (categoriesId) => {
    const result = await Promise.all(categoriesId.map(async (id) => {
      const category = await models.Category.findOne({ where: { id } });
      if (!category) errors('NorFoundError', '"categoryIds" not found', 400);
    }));
    return result;
  },

  validateCategorie: async (body) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    }).required();

    try {
      const result = await schema.validateAsync(body);
      return result;
    } catch (error) {
      errors('ValidationError', '"name" is required', 400);
    }
  },
};

module.exports = categoriesService;