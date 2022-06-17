import moment from "moment";

export class CompiledEvaluation {
  constructor(
    private id: string,
    private email_creator_compiled: string,
    private email_leaguer: string,
    private created_at: Date | string,
    private performance: number,
    private quality_on_delivery: number,
    private proactivity: number,
    private commitment: number,
    private team_work: number,
    private skillset_growth: number,
    private leadership: number,
    private punctuality: number,
    private work_under_pressure: number,
    private participation: number,
    private administrative_tasks: number,
    private highlights_leaguer: string,
    private comment: string
  ) {}
  getId() {
    return this.id;
  }

  getEmailFeedbackCreator() {
    return this.email_creator_compiled;
  }
  getCreatedAt() {
    return this.created_at;
  }

  getPerformance() {
    return this.performance;
  }

  getQualityOnDelivery() {
    return this.quality_on_delivery;
  }
  getCommitment() {
    return this.commitment;
  }
  getTeamWork() {
    return this.team_work;
  }
  getParticipation() {
    return this.participation;
  }
  getPunctuality() {
    return this.punctuality;
  }
  getComment() {
    return this.comment;
  }
  static toCompiledEvaluationModel(evaluation: any): CompiledEvaluation {
    return new CompiledEvaluation(
      evaluation.id,
      evaluation.email_creator_compiled,
      evaluation.email_leaguer,
      moment(evaluation.created_at, "YYYY-MM-DDAAAAAAAAAAAAAA").format(
        "DD-MM-YYYY"
      ),
      evaluation.performance,
      evaluation.quality_on_delivery,
      evaluation.proactivity,
      evaluation.commitment,
      evaluation.team_work,
      evaluation.skillset_growth,
      evaluation.leadership,
      evaluation.punctuality,
      evaluation.work_under_pressure,
      evaluation.participation,
      evaluation.administrative_tasks,
      evaluation.highlights_leaguer,
      evaluation.comment
    );
  }
}
export interface CompiledEvaluationInputDTO {
  email_creator_compiled: string;
  email_leaguer: string;
  performance: number;
  quality_on_delivery: number;
  proactivity: number;
  commitment: number;
  team_work: number;
  skillset_growth: number;
  leadership: number;
  punctuality: number;
  work_under_pressure: number;
  participation: number;
  administrative_tasks: number;
  highlights_leaguer: string;
  comment: string;
}
