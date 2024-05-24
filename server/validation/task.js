import { Joi } from "express-validation";

export const CreateTaskPayload = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    assignedUser: Joi.string().required(),
    categoryId: Joi.string().required(),
  }),
};

export const filterTaskPayload = {
  body: Joi.object({
    assignedUser: Joi.string().allow(null, ""),
    categoryId: Joi.string().allow(null, ""),
  }),
};

export const UpdateTaskPayload = {
  body: Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    assignedUser: Joi.string().required(),
    categoryId: Joi.string().required(),
  }),
};
