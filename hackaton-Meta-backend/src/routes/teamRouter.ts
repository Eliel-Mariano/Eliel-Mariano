import express from "express";
import { TeamController } from "../controller/TeamController";

export const teamRouter = express.Router();
const teamController = new TeamController();

//get all teams
teamRouter.get("/all", teamController.getTeams);

//create team
teamRouter.post("/create", teamController.createTeam);
