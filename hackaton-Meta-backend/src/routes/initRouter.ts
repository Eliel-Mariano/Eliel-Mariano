import express from "express";
import { InitialGetController } from "../controller/InitialGetController";

export const initRouter = express.Router();

//create team
const initController = new InitialGetController();
initRouter.get("/", initController.getInit);
