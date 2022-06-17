import express from "express";
import { CompiledEvaluationController } from "../controller/CompiledEvaluationController";
export const compiledRouter = express.Router();

const compiledEvaluationController = new CompiledEvaluationController();

//get compiled evaluation by leaguer id
compiledRouter.get(
  "/get/:idLeaguer",
  compiledEvaluationController.getCompiledEvaluationsByIdLeaguer
);

//create compiled evaluation
compiledRouter.post(
  "/create",
  compiledEvaluationController.createCompiledEvaluation
);
