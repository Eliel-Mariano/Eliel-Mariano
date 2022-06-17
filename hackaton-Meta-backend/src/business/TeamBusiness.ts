import { TeamDatabase } from "../data/TeamDatabase";
import { Team, TeamInputDTO } from "../model/TeamModel";
import { USER_ROLES } from "../model/User_Roles";
import { Authenticator } from "../services/Authenticator";
import { Idgenerator } from "../services/IdGenerator";

export class TeamBusiness {
  async createTeam(input: TeamInputDTO, token: string): Promise<void> {
    try {
      //generating id
      const idGenerator = new Idgenerator();
      const id = idGenerator.generateId();

      //verifying input and token
      if (!input.team_name || typeof input.team_name === "number")
        throw new Error(
          "Campo inválido, certifique-se de que o nome da classe é uma 'string'."
        );
      if (!token) {
        throw new Error(
          "Esse endpoint requer um token no headers authorization."
        );
      }

      //validating team name
      const teamDatabase = new TeamDatabase();
      const isRegisteredClass = await teamDatabase.getTeamByName(
        input.team_name
      );
      if (isRegisteredClass) {
        throw new Error("Já existe uma turma com este nome.");
      }

      //token authentication
      const authenticator = new Authenticator();
      const tokenData = authenticator.getTokenData(token);

      //validating user role
      if (tokenData.role !== "ADMIN" && tokenData.role !== "MENTOR") {
        throw new Error(
          "Somente mentores e administradores podem criar novas turmas."
        );
      }

      //creating team
      await teamDatabase.createTeam(id, input.team_name);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getAllTeams(token: string): Promise<Team[] | undefined> {
    try {
      //token authentication
      const authenticator = new Authenticator();
      const tokenData = authenticator.getTokenData(token);

      //verifying token
      if (!tokenData) {
        throw new Error(
          "Esse endpoint requer um token no headers authorization."
        );
      }
      //validating user role
      if (
        tokenData.role !== "ADMIN" &&
        tokenData.role !== "MENTOR" &&
        tokenData.role !== USER_ROLES.GESTOR
      ) {
        throw new Error(
          "Somente mentores, gestores e administradores podem ver todas turmas."
        );
      }

      //creating team

      const teamDatabase = new TeamDatabase();
      const teams = await teamDatabase.getAllTeams();
      return teams;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
