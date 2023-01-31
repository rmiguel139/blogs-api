const Joi = require('joi');
const jwt = require('jsonwebtoken');
const errors = require('./errors');

const secret = process.env.JWT_SECRET;

const loginService = {
    validation: async (body) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).required();
        try {
            const result = await schema.validateAsync(body);
            return result;
        } catch (error) {
            errors('validationError', 'Some required fields are missing', 400);
        }
    },

    generateToken: async (data) => {
        const payload = { data };
        const token = jwt.sign(payload, secret, { expiresIn: '7d' });
        return token;
    },
};

module.exports = loginService;