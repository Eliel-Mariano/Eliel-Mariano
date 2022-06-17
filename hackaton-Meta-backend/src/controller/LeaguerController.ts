import { Request, Response } from "express";
import { LeaguerBusiness } from "../business/LeaguerBusiness";
import {
  EditLeaguerInputDTO,
  SignupLeaguerInputDTO,
} from "../types/signupLeaguerInputDTO";

const leaguerBusiness = new LeaguerBusiness();

export class LeaguerContoller {
  createLeaguer = async (req: Request, res: Response): Promise<any> => {
    try {
      const token = req.headers.authorization as string;

      const {
        photo_leaguer,
        position,
        hiring_model,
        name,
        email,
        phase,
        technologies,
        languages,
        id_mentor,
        id_manager,
        id_admin,
        name_class,
      } = req.body;

      const input: SignupLeaguerInputDTO = {
        photo_leaguer,
        position,
        hiring_model,
        name,
        email,
        phase,
        technologies,
        languages,
        id_mentor,
        id_manager,
        id_admin,
        name_class,
      };

      await leaguerBusiness.createLeaguer(input, token);

      res.status(201).send({ message: "Leaguer cadastrado com sucesso!" });
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro no cadastro");
    }
  };

  async getAllLeaguers(req: Request, res: Response): Promise<void> {
    try {
      //input req
      const token_headers = req.headers.authorization as string;

      //getting leaguers from databank
      const leaguersBusiness = new LeaguerBusiness();
      const leaguers = await leaguersBusiness.getAllLeaguers(token_headers);

      res.status(200).send(leaguers);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
  async getLeaguerById(req: Request, res: Response): Promise<void> {
    try {
      //input req
      const token_headers = req.headers.authorization as string;
      const idLeaguer = req.params.id;

      //getting leaguers from databank by id
      const leaguersBusiness = new LeaguerBusiness();
      const leaguers = await leaguersBusiness.getLeaguerById(
        token_headers,
        idLeaguer
      );
      res.status(200).send(leaguers);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  editLeaguer = async (req: Request, res: Response): Promise<any> => {
    try {
      const token = req.headers.authorization as string;
      const idLeaguer = req.params.idLeaguer;

      const {
        photo_leaguer,
        position,
        hiring_model,
        name,
        phase,
        technologies,
        languages,
        id_mentor,
        id_manager,
        id_admin,
      } = req.body;

      const input: EditLeaguerInputDTO = {
        photo_leaguer,
        position,
        hiring_model,
        name,
        phase,
        technologies,
        languages,
        id_mentor,
        id_manager,
        id_admin,
      };

      await leaguerBusiness.editLeaguer(input, token, idLeaguer);

      res.status(201).send({ message: "Leaguer editado com sucesso!" });
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro no cadastro");
    }
  };

  deleteLeaguer = async (req: Request, res: Response): Promise<any> => {
    try {
      const token = req.headers.authorization as string;
      const idLeaguer = req.params.idLeaguer;

      await leaguerBusiness.deleteLeaguer(token, idLeaguer);

      res.status(201).send({ message: "Leaguer deletado com sucesso!" });
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro no cadastro");
    }
  };
}
