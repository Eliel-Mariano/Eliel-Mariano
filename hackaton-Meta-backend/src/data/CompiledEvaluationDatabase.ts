import { CompiledEvaluation } from "../model/CompiledEvalution";
import { BaseDatabase } from "./BaseDatabase";

export class CompiledEvaluationDatabase extends BaseDatabase {
  private static TABLE_NAME = "feedbacks_compiled_meta";
  public async createEvaluationCompiled(
    id: string,
    email_creator_compiled: string,
    email_leaguer: string,
    created_at: Date | string,
    performance: number,
    quality_on_delivery: number,
    proactivity: number,
    commitment: number,
    team_work: number,
    skillset_growth: number,
    leadership: number,
    punctuality: number,
    work_under_pressure: number,
    participation: number,
    administrative_tasks: number,
    highlights_leaguer: string,
    comment: string
  ): Promise<void> {
    try {
      await this.connection(CompiledEvaluationDatabase.TABLE_NAME)
        .insert({
          id,
          email_creator_compiled,
          email_leaguer,
          created_at,
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
        })
        .into(CompiledEvaluationDatabase.TABLE_NAME);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async getEvaluationCompiledByIdLeaguer(id_leaguer: string) {
    try {
      const leaguer = await this.connection("leaguer_meta")
        .select("*")
        .where({ id: id_leaguer });
      const result = await this.connection(
        CompiledEvaluationDatabase.TABLE_NAME
      )
        .select("*")
        .from(CompiledEvaluationDatabase.TABLE_NAME)
        .where({ email_leaguer: leaguer[0].email });

      return result.map((evaluations) =>
        CompiledEvaluation.toCompiledEvaluationModel(evaluations)
      );
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
