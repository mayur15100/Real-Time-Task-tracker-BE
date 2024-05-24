import express from "express";
import { validate, ValidationError } from "express-validation";

import { get, create, update, destroy } from "./controller.js";
import {
  CreateTaskPayload,
  UpdateTaskPayload,
  filterTaskPayload,
} from "../../validation/index.js";
let router = express.Router();

router.post("/filter", validate(filterTaskPayload, {}, {}), get);
router.post("/", validate(CreateTaskPayload, {}, {}), create);
router.put("/", validate(UpdateTaskPayload, {}, {}), update);

router.delete("/:id", destroy);

router.use((err, req, res, next) => {
  let result = "";
  if (err instanceof ValidationError) {
    const error = err;
    result += error.details.body?.map((data) => data.message);
    const searchRegExp = new RegExp('"', "g");
    const errorMessage = result.toString().replace(searchRegExp, "");
    return res.status(err.statusCode).json(errorMessage);
  }
});
export default router;
