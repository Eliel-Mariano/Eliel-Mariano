import { Team } from "../model/TeamModel";
import { BaseDatabase } from "./BaseDatabase";

export class TeamDatabase extends BaseDatabase {
  private static TABLE_NAME = "class_meta";

  public async createTeam(id: string, team_name: string): Promise<void> {
    try {
      await this.connection(TeamDatabase.TABLE_NAME)
        .insert({
          id,
          team_name,
        })
        .into(TeamDatabase.TABLE_NAME);
    } catch (err: any) {
      console.log(err.sqlMessage || err.message);
      throw new Error(err.sqlMessage || err.message);
    }
  }
  public async getTeamByName(name: string) {
    try {
      const result = await this.connection(TeamDatabase.TABLE_NAME)
        .select("*")
        .from(TeamDatabase.TABLE_NAME)
        .where({ team_name: name });
      return result[0] && Team.toTeamModel(result[0]);
    } catch (err: any) {
      
      throw new Error(err.sqlMessage || err.message);
    }
  }
  public async getAllTeams(): Promise<Team[]> {
    try {
      const allTeamsData = await this.connection(
        TeamDatabase.TABLE_NAME
      ).select("*");
      return allTeamsData.map((team) => Team.toTeamModel(team));
    } catch (err: any) {
      
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
