import { Feedback } from "../model/Feedback";
import { BaseDatabase } from "./BaseDatabase";

export class FeedbackDatabase extends BaseDatabase {
  private static TABLE_NAME = "create_feedback_meta";

  public async createFeedback(
    id: string,
    email_leaguer: string,
    email_creator: string,
    email_evaluators: string[],
    created_at: Date | string
  ): Promise<void> {
    try {
      await this.connection(FeedbackDatabase.TABLE_NAME)
        .insert({
          id,
          email_leaguer,
          email_creator,
          email_evaluators,
          created_at,
        })
        .into(FeedbackDatabase.TABLE_NAME);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
  public async getFeedbackById(id: string): Promise<Feedback> {
    try {
      const result = await this.connection(FeedbackDatabase.TABLE_NAME)
        .select("*")
        .from(FeedbackDatabase.TABLE_NAME)
        .where({ id });
      return result[0] && Feedback.toFeedbackModel(result[0]);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
