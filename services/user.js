const Joi = require('joi');
const models = require('../database/models');
const errors = require('./errors');

const userService = {
    createUser: async (body) => {
        const newUser = await models.User.create(body, { raw: true });
        return newUser;
    },
    getAll: async () => {
        const users = await models.User.findAll({
          attributes: { exclude: ['password'] },
          raw: true,
        });
        return users;
      },

    getById: async (id) => {
        const user = await models.User.findByPk(id, {
          attributes: { exclude: ['password'] },
          raw: true,
        });
    
        if (!user) return errors('NotFoundError', 'User does not exist', 404);
    
        return user;
      },
    
    userByEmail: async ({ email }) => {
        const user = await models.User.findOne({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: { email },
            raw: true,
        });
        if (!user) return errors('unauthorizedError', 'Invalid fields', 400);
        return user;
    },

    checkEmail: async (email) => {
        const checkEmail = await models.User.findOne({ where: { email } });
        if (checkEmail) return errors('ConflictError', 'User already registered', 409);
    },

    validateUser: async (body) => {
        const schema = Joi.object({
            displayName: Joi.string().min(8).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            image: Joi.string().required(),
        }).required();

        try {
            const result = await schema.validateAsync(body);
            return result;
        } catch (error) {
            const name = 'ValidationError';
            const { message } = error;
            const status = 400;
            errors(name, message, status);
        }
    },
};

module.exports = userService;