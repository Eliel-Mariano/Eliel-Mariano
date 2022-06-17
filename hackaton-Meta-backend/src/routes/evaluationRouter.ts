import express from "express";
import { EvaluationController } from "../controller/EvaluationController";

export const evaluationRouter = express.Router();
const evaluationController = new EvaluationController();

//get evaluations by creator
evaluationRouter.get(
  "/creator",
  evaluationController.getEvaluationsByCreatorEmail
);

//get evaluations by leaguer email
evaluationRouter.get(
  "/leaguer",
  evaluationController.getEvaluationsByLeaguerEmail
);

//get evaluations by leaguer id
evaluationRouter.get(
  "/leaguer/:id",
  evaluationController.getEvaluationsByLeaguerId
);

//get evaluations by responsible
evaluationRouter.get(
  "/responsible/:id",
  evaluationController.getEvaluationsByCreatorId
);

//get averaged evaluation by leaguer id
evaluationRouter.get(
  "/leaguer/averaged/:idLeaguer",
  evaluationController.getAveragedEvaluationsById
);

//create evaluation
evaluationRouter.post("/create", evaluationController.createEvaluation);
