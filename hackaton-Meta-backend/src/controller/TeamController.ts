import { Request, Response } from "express";
import { TeamBusiness } from "../business/TeamBusiness";
import { TeamInputDTO } from "../model/TeamModel";

export class TeamController {
  async createTeam(req: Request, res: Response) {
    try {
      //inputs req
      const token = req.headers.authorization as string;
      const input: TeamInputDTO = {
        team_name: req.body.team_name,
      };

      //inserting team in databank
      const teamBusiness = new TeamBusiness();
      await teamBusiness.createTeam(input, token);
      res.status(201).send({ message: "Classe criada!" });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
  async getTeams(req: Request, res: Response) {
    try {
      //inputs req
      const token = req.headers.authorization as string;

      //get teams from databank
      const teamBusiness = new TeamBusiness();
      const teams = await teamBusiness.getAllTeams(token);
      res.status(200).send(teams);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
