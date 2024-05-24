import express from "express";
import { get } from "./controller.js";
let router = express.Router();

router.get("/", get);
export default router;
