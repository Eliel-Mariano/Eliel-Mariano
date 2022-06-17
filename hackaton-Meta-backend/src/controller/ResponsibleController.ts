import { Request, Response } from "express";
import { ResponsibleBusiness } from "../business/ResponsibleBusiness";
import {
  LoginInputDTO,
  RoleInputDTO,
  SignupResponsibleInputDTO,
} from "../model/Responsible";
import { Authenticator } from "../services/Authenticator";

const responsibleBusiness = new ResponsibleBusiness();

export class ResponsibleController {
  async create(req: Request, res: Response) {
    try {
      const access_key: string | undefined = req?.body.access_key;
      const input: SignupResponsibleInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };

      const token = await responsibleBusiness.create(input, access_key);

      res.status(201).send({
        message: "Usuário cadastrado com sucesso!",
        token: token,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro no signup");
    }
  }
  async login(req: Request, res: Response) {
    try {
      const input: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const token = await responsibleBusiness.login(input);

      res.status(200).send({ message: "Usuário logado", token: token });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  async editRole(req: Request, res: Response) {
    try {
      const tokenHeaders = req.headers.authorization as string;

      const input: RoleInputDTO = {
        id: req.body.id,
        role: req.body.role,
      };

      const role = await responsibleBusiness.editRole(input, tokenHeaders);

      res
        .status(200)
        .send({ message: "Role alterado com sucesso!", token: role });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  async getAllResponsibles(req: Request, res: Response): Promise<void> {
    try {
      const token_headers = req.headers.authorization as string;

      const responsibleBusiness = new ResponsibleBusiness();
      const responsible = await responsibleBusiness.getAllResponsibles(
        token_headers
      );
      res.status(200).send(responsible);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
