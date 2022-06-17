import { Request, Response } from "express";

export class InitialGetController {
  async getInit(req: Request, res: Response): Promise<void> {
    try {
      const messageObj = {
        Message:
          "Bem vindo a API do grupo 1 do hackathon meta! Segue abaixo o link da documentação dos endpoints:",
        LinkDocumentation:
          "https://documenter.getpostman.com/view/19296644/Uz5FJGUr#8a4b5124-445f-4e06-ba25-a5fb345625b4",
      };
      res.status(200).send(messageObj);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
