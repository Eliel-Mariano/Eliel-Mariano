export class Team {
  constructor(private id: string, private team_name: string) {}

  getId() {
    return this.id;
  }

  getTeam_Name() {
    return this.team_name;
  }
  static toTeamModel(team: any): Team {
    return new Team(team.id, team.team_name);
  }
}

export interface TeamInputDTO {
  team_name: string;
}
