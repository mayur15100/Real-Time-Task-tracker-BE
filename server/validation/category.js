import { Joi } from "express-validation";

export const createCateogryPayload = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

export const updateCateogryPayload = {
  body: Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
  }),
};
