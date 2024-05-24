import express from "express";
import { validate, ValidationError } from "express-validation";

import { get, create, update } from "./controller.js";
import {
  createCateogryPayload,
  updateCateogryPayload,
} from "../../validation/index.js";
let router = express.Router();

router.get("/", get);
router.post("/", validate(createCateogryPayload, {}, {}), create);
router.put("/", validate(updateCateogryPayload, {}, {}), update);

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
