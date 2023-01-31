const Joi = require('joi');
const models = require('../database/models');
const errors = require('./errors');

const posts = {
  createPost: async (body) => {
    const model = await models.BlogPost.create(body, { raw: true });
    const createdPost = model.toJSON();
    return createdPost;
  },

  validate: async (body) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number().required()),
    }).required();

    try {
      const { categoryIds, ...result } = await schema.validateAsync(body);
      return result;
    } catch (error) {
      errors('ValidationError',
       'Some required fields are missing',
       400);
    }
  },
};

module.exports = posts; 
