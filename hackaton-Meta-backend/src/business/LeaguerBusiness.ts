import { LeaguerDatabase } from "../data/LeaguerDatabase";
import { Leaguer } from "../model/Leaguer";
import { USER_ROLES } from "../model/User_Roles";
import { Authenticator } from "../services/Authenticator";
import { Idgenerator } from "../services/IdGenerator";
import { editLeaguerType, leaguerType } from "../types/leaguerType";
import {
  EditLeaguerInputDTO,
  SignupLeaguerInputDTO,
} from "../types/signupLeaguerInputDTO";

const leaguerDatabase = new LeaguerDatabase();
const authenticator = new Authenticator();
const idGenerator = new Idgenerator();

export class LeaguerBusiness {
  createLeaguer = async (
    input: SignupLeaguerInputDTO,
    token: string
  ): Promise<void> => {
    const {
      photo_leaguer,
      position,
      hiring_model,
      name,
      email,
      phase,
      technologies,
      languages,
      id_mentor,
      id_manager,
      id_admin,
      name_class,
    } = input;

    if (
      !position ||
      !hiring_model ||
      !name ||
      !email ||
      !phase ||
      !technologies
    ) {
      throw new Error(
        "Os campos position, hiring_model, name, email, phase, technologies, languages são obrigatórios."
      );
    }

    if (!token) {
      throw new Error(
        "Esse endpoint requer um token no headers authorization."
      );
    }

    const tokenData = authenticator.getTokenData(token);

    if (tokenData.role !== "ADMIN" && tokenData.role !== "MENTOR") {
      throw new Error("Somente MENTOR e ADMIN podem cadastrar um leaguer.");
    }

    const registeredUser = await leaguerDatabase.findByEmail(email);
    if (registeredUser.length !== 0) {
      throw new Error("Email já cadastrado.");
    }

    if (!email.includes("@") || !email.includes(".com")) {
      throw new Error("Formato de email inválido.");
    }

    const id = idGenerator.generateId();

    const leaguer: leaguerType = {
      id,
      photo_leaguer,
      position,
      hiring_model,
      name,
      email,
      phase,
      technologies,
      languages,
      id_mentor,
      id_manager,
      id_admin,
      name_class,
    };

    await leaguerDatabase.create(leaguer);
  };
  async getAllLeaguers(token_headers: string): Promise<Leaguer[] | undefined> {
    try {
      //verifying token
      if (!token_headers) {
        throw new Error(
          "Esse endpoint requer um token no headers authorization."
        );
      }

      //token authentication
      const authenticator = new Authenticator();
      const tokenData = authenticator.getTokenData(token_headers);

      //validating user role
      if (
        tokenData.role !== USER_ROLES.ADMIN &&
        tokenData.role !== USER_ROLES.MENTOR &&
        tokenData.role !== USER_ROLES.GESTOR
      ) {
        throw new Error(
          "Somente gestores, mentores e administradores e gestores podem ver avaliações."
        );
      }
      //fecthing leaguers
      const leaguersDatabase = new LeaguerDatabase();
      const leaguers = await leaguersDatabase.getAllLeaguers();
      if (!leaguers) {
        throw new Error("Ocorreu um erro, por favor tente novamente.");
      }
      return leaguers;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getLeaguerById(
    token_headers: string,
    idLeaguer: string
  ): Promise<Leaguer | undefined> {
    try {
      //verifying token
      if (!token_headers) {
        throw new Error(
          "Esse endpoint requer um token no headers authorization."
        );
      }

      //token authentication
      const authenticator = new Authenticator();
      const tokenData = authenticator.getTokenData(token_headers);

      //validating user role
      if (
        tokenData.role !== USER_ROLES.ADMIN &&
        tokenData.role !== USER_ROLES.MENTOR &&
        tokenData.role !== USER_ROLES.GESTOR
      ) {
        throw new Error(
          "Somente gestores, mentores e administradores e gestores podem ver leaguer."
        );
      }
      //fecthing leaguers
      const leaguersDatabase = new LeaguerDatabase();
      const leaguers = await leaguersDatabase.getLeaguerById(idLeaguer);
      if (!leaguers) {
        throw new Error("Id inválido.");
      }

      return leaguers;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  editLeaguer = async (
    input: EditLeaguerInputDTO,
    token: string,
    idLeaguer: any
  ): Promise<void> => {
    const {
      photo_leaguer,
      position,
      hiring_model,
      name,
      phase,
      technologies,
      languages,
      id_mentor,
      id_manager,
      id_admin,
    } = input;

    if (!idLeaguer) {
      throw new Error("Esse endpoint requer um idLeaguer como req.params .");
    }

    if (!token) {
      throw new Error(
        "Esse endpoint requer um token no headers authorization."
      );
    }

    const tokenData = authenticator.getTokenData(token);

    if (tokenData.role !== "ADMIN" && tokenData.role !== "MENTOR") {
      throw new Error("Somente MENTOR e ADMIN podem editar um leaguer.");
    }

    const leaguer: editLeaguerType = {
      photo_leaguer,
      position,
      hiring_model,
      name,
      phase,
      technologies,
      languages,
      id_mentor,
      id_manager,
      id_admin,
    };

    await leaguerDatabase.editLeaguer(leaguer, idLeaguer);
  };

  deleteLeaguer = async (token: string, idLeaguer: any): Promise<void> => {
    if (!idLeaguer) {
      throw new Error("Esse endpoint requer um idLeaguer como req.params .");
    }

    if (!token) {
      throw new Error(
        "Esse endpoint requer um token no headers authorization."
      );
    }

    const tokenData = authenticator.getTokenData(token);

    if (tokenData.role !== "ADMIN" && tokenData.role !== "MENTOR") {
      throw new Error("Somente ADMIN podem deletar um leaguer.");
    }

    await leaguerDatabase.deleteLeaguer(idLeaguer);
  };
}
