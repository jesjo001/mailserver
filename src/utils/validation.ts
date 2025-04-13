import Joi from 'joi';

export const validateRegistration = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  });

  return schema.validate(data);
};

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};

export const validateMessage = (data: any) => {
  const schema = Joi.object({
    recipient: Joi.string().required(),
    subject: Joi.string().required(),
    content: Joi.string().required()
  });

  return schema.validate(data);
};