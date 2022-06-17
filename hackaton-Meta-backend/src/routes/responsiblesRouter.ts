import express from "express";
import { ResponsibleController } from "../controller/ResponsibleController";

export const responsibleRouter = express.Router();

const responsibleController = new ResponsibleController();
responsibleRouter.post("/signup", responsibleController.create);
responsibleRouter.post("/login", responsibleController.login);
responsibleRouter.put("/editRole", responsibleController.editRole);
responsibleRouter.get("/getAll", responsibleController.getAllResponsibles);


