import { Evaluation } from "../model/Evaluation";
import { BaseDatabase } from "./BaseDatabase";

export class EvaluationDatabase extends BaseDatabase {
  private static TABLE_NAME = "received_feedbacks_meta";

  public async createEvaluationFeedback(
    id: string,
    leaguer_email: string,
    email_creator_feedback: string,
    email_evaluator: string,
    created_at_: Date | string,
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
      await this.connection(EvaluationDatabase.TABLE_NAME)
        .insert({
          id,
          leaguer_email,
          email_creator_feedback,
          email_evaluator,
          created_at_,
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
        .into(EvaluationDatabase.TABLE_NAME);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async getEvaluationsByEmailCreator(email_creator: string) {
    try {
      const result = await this.connection(EvaluationDatabase.TABLE_NAME)
        .select("*")
        .from(EvaluationDatabase.TABLE_NAME)
        .where({ email_creator_feedback: email_creator });

      return result.map((evaluations) =>
        Evaluation.toEvaluationModel(evaluations)
      );
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async getEvaluationsByEmailLeaguer(email_leaguer: string) {
    try {
      const result = await this.connection(EvaluationDatabase.TABLE_NAME)
        .select("*")
        .from(EvaluationDatabase.TABLE_NAME)
        .where({ leaguer_email: email_leaguer });

      return result.map((evaluations) =>
        Evaluation.toEvaluationModel(evaluations)
      );
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  getAveragedEvaluationsById = async (idLeaguer: string): Promise<any> => {
    try {
      const leaguer = await this.connection.raw(`
      SELECT name, email, phase
      FROM leaguer_meta
      WHERE id = "${idLeaguer}";
      `);

      const creatorCompiled = await this.connection.raw(`
      SELECT email_creator_compiled
      FROM feedbacks_compiled_meta
      `);

      const compiled = await this.connection.raw(`
      SELECT
        AVG (performance) performance,
        AVG (quality_on_delivery) quality_on_delivery,
        AVG (proactivity) proactivity,
        AVG (commitment) commitment,
        AVG (team_work) team_work,
        AVG (skillset_growth) skillset_growth,
        AVG (leadership) leadership,
        AVG (punctuality) punctuality,
        AVG (work_under_pressure) work_under_pressure,
        AVG (participation) participation,
        AVG (administrative_tasks) administrative_tasks
      FROM received_feedbacks_meta
      WHERE leaguer_email = "${leaguer[0][0].email}";
      `);

      const result = {
        idLeaguer,
        name: leaguer[0][0].name,
        email: leaguer[0][0].email,
        phase: leaguer[0][0].phase,
        creatorCompiled: creatorCompiled[0][0], //.email_creator_compiled
        compiled: compiled[0][0],
      };

      return result;
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  getEvaluationsByLeaguerId = async (id: string): Promise<Evaluation[]> => {
    try {
      const leaguer = await this.connection("leaguer_meta")
        .select("email")
        .where({ id: id });

      const result = await this.connection(EvaluationDatabase.TABLE_NAME)
        .select("*")
        .from(EvaluationDatabase.TABLE_NAME)
        .where({ leaguer_email: leaguer[0].email });
      return result.map((evaluations) =>
        Evaluation.toEvaluationModel(evaluations)
      );
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  };
  getEvaluationsByCreatorId = async (id: string): Promise<Evaluation[]> => {
    try {
      const responsible_creator = await this.connection("responsible_meta")
        .select("email")
        .where({ id: id });

      const result = await this.connection(EvaluationDatabase.TABLE_NAME)
        .select("*")
        .from(EvaluationDatabase.TABLE_NAME)
        .where({ email_creator_feedback: responsible_creator[0].email });
      return result.map((evaluations) =>
        Evaluation.toEvaluationModel(evaluations)
      );
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  };
}
