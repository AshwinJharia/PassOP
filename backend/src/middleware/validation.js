import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required()
});

export const passwordSchema = Joi.object({
    site: Joi.string().min(1).required(),
    username: Joi.string().min(1).max(100).required(),
    password: Joi.string().min(1).required(),
    id: Joi.string().optional()
});

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};