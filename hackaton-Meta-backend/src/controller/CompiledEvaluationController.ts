import { Request, Response } from "express";
import { CompiledEvaluationBusiness } from "../business/CompiledEvaluationBusiness";
import { CompiledEvaluationInputDTO } from "../model/CompiledEvalution";

const compiledEvaluationBusiness = new CompiledEvaluationBusiness();

export class CompiledEvaluationController {
  async createCompiledEvaluation(req: Request, res: Response) {
    try {
      //inputs req
      const token_headers = req.headers.authorization as string;
      const {
        email_creator_compiled,
        email_leaguer,
        performance,
        quality_on_delivery,
        proactivity,
        commitment,
        team_work,
        skillset_growth,
        leadership,
        punctuality,
        work_under_pressure,
        participation,
        administrative_tasks,
        highlights_leaguer,
        comment,
      } = req.body;

      const input: CompiledEvaluationInputDTO = {
        email_creator_compiled,
        email_leaguer,
        performance,
        quality_on_delivery,
        proactivity,
        commitment,
        team_work,
        skillset_growth,
        leadership,
        punctuality,
        work_under_pressure,
        participation,
        administrative_tasks,
        highlights_leaguer,
        comment,
      };
      //creating compiled evaluation request in databank
      await compiledEvaluationBusiness.createCompiledEvaluation(
        input,
        token_headers
      );
      res.status(201).send({
        message: "Avaliação compilada criada com sucesso!",
      });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  getCompiledEvaluationsByIdLeaguer = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const token_headers = req.headers.authorization as string;
      const idLeaguer = req.params.idLeaguer;

      const compiled =
        await compiledEvaluationBusiness.getCompiledEvaluationsByIdLeaguer(
          idLeaguer,
          token_headers
        );

      res.status(200).send(compiled);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
}
