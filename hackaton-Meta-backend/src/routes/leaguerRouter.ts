import express from "express";
import { LeaguerContoller } from "../controller/LeaguerController";

export const leaguerRouter = express.Router();

const leaguerController = new LeaguerContoller();

//get all leaguers
leaguerRouter.get("/getAll", leaguerController.getAllLeaguers);

//get leaguer by id
leaguerRouter.get("/get/:id", leaguerController.getLeaguerById);

//edit leaguers
leaguerRouter.post("/create", leaguerController.createLeaguer);
leaguerRouter.put("/edit/:idLeaguer", leaguerController.editLeaguer);
leaguerRouter.delete("/delete/:idLeaguer", leaguerController.deleteLeaguer);
