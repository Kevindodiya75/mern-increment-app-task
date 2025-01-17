import express from "express";
import {
  increment,
  getIncrementValue,
} from "../controllers/incrementController.js";

const router = express.Router();

router.post("/increment", increment);

router.get("/Getincrement", getIncrementValue);

export default router;
