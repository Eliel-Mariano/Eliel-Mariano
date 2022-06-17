import moment from "moment";

export class Feedback {
  constructor(
    private id: string,
    private email_leaguer: string,
    private email_creator: string,
    private email_evaluators: string[],
    private created_at: Date | string
  ) {}
  getId() {
    return this.id;
  }

  getEmailLeaguer() {
    return this.email_leaguer;
  }

  getNameCreator() {
    return this.email_creator;
  }

  getEmailEvaluator() {
    return this.email_evaluators;
  }
  getCreatedAt() {
    return this.created_at;
  }
  static toFeedbackModel(feedback: any): Feedback {
    return new Feedback(
      feedback.id,
      feedback.email_leaguer,
      feedback.email_creator,
      feedback.email_evaluators,
      moment(feedback.created_at, "YYYY-MM-DDAAAAAAAAAAAAAA").format(
        "DD-MM-YYYY"
      )
    );
  }
}
export interface FeedbackInputDTO {
  email_leaguer: string;
  email_creator: string;
  email_evaluators: string[];
}

