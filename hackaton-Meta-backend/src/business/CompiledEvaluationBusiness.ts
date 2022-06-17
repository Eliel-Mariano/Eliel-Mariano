import { Authenticator } from "../services/Authenticator";
import { Idgenerator } from "../services/IdGenerator";
import { ResponsibleDatabase } from "../data/ResponsibleDatabase";
import { LeaguerDatabase } from "../data/LeaguerDatabase";
import { USER_ROLES } from "../model/User_Roles";
import { CompiledEvaluationDatabase } from "../data/CompiledEvaluationDatabase";
import {
  CompiledEvaluation,
  CompiledEvaluationInputDTO,
} from "../model/CompiledEvalution";

const authenticator = new Authenticator();
const compiledEvaluationDatabase = new CompiledEvaluationDatabase();

export class CompiledEvaluationBusiness {
  async createCompiledEvaluation(
    input: CompiledEvaluationInputDTO,
    token_headers: string
  ): Promise<void> {
    try {
      //generating id
      const idGenerator = new Idgenerator();
      const id = idGenerator.generateId();

      //created at
      const created_at = new Date();

      //verifying input and token
      if (
        !input.email_creator_compiled ||
        !input.email_leaguer ||
        !input.performance ||
        !input.quality_on_delivery ||
        !input.proactivity ||
        !input.commitment ||
        !input.team_work ||
        !input.skillset_growth ||
        !input.leadership ||
        !input.punctuality ||
        !input.work_under_pressure ||
        !input.participation ||
        !input.administrative_tasks ||
        !input.highlights_leaguer ||
        !input.comment ||
        typeof input.participation !== "number" ||
        typeof input.quality_on_delivery !== "number" ||
        typeof input.leadership !== "number" ||
        typeof input.performance !== "number" ||
        typeof input.punctuality !== "number" ||
        typeof input.commitment !== "number" ||
        typeof input.proactivity !== "number" ||
        typeof input.work_under_pressure !== "number" ||
        typeof input.skillset_growth !== "number" ||
        typeof input.administrative_tasks !== "number" ||
        typeof input.quality_on_delivery !== "number" ||
        typeof input.team_work !== "number" ||
        typeof input.highlights_leaguer !== "string" ||
        typeof input.comment !== "string"
      )
        throw new Error(
          "Um ou mais campos inválidos, certifique-se de que o campo 'highlights_leaguer' e 'comment' são uma string e os demais campos são 'numbers'."
        );

      if (
        input.email_creator_compiled.indexOf("@") === -1 ||
        !input.email_creator_compiled.includes(".com") ||
        input.email_leaguer.indexOf("@") === -1 ||
        !input.email_leaguer.includes(".com")
      ) {
        throw new Error("Email inválido.");
      }
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
        tokenData.role !==USER_ROLES.GESTOR
      ) {
        throw new Error(
          "Somente mentores, gestores e administradores podem ver as avaliações compiladas."
        );
      }
      //validating user creator email
      const responsibleDatabase = new ResponsibleDatabase();
      const isRegisteredUser = await responsibleDatabase.findUserByEmail(
        input.email_creator_compiled
      );
      if (!isRegisteredUser) {
        throw new Error("Usuário não cadastrado.");
      }

      //validating leaguer name
      const leaguerDatabase = new LeaguerDatabase();
      const isRegisteredLeaguer = await leaguerDatabase.getLeaguerByEmail(
        input.email_leaguer
      );
      if (!isRegisteredLeaguer) {
        throw new Error("Leaguer não cadastrado.");
      }

      //creating compiled evaluation
      await compiledEvaluationDatabase.createEvaluationCompiled(
        id,
        input.email_creator_compiled,
        input.email_leaguer,
        created_at,
        input.performance,
        input.quality_on_delivery,
        input.proactivity,
        input.commitment,
        input.team_work,
        input.skillset_growth,
        input.leadership,
        input.punctuality,
        input.work_under_pressure,
        input.participation,
        input.administrative_tasks,
        input.highlights_leaguer,
        input.comment
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  getCompiledEvaluationsByIdLeaguer = async (
    idLeaguer: string,
    token_headers: string
  ): Promise<CompiledEvaluation[] | undefined> => {
    try {
      //verifying input and token
      if (!token_headers) {
        throw new Error(
          "Esse endpoint requer um token no headers authorization."
        );
      }
      if (!idLeaguer) {
        throw new Error("Esse endpoint requer um idLeaguer no params.");
      }

      const tokenData = authenticator.getTokenData(token_headers);

       if (
         tokenData.role !== USER_ROLES.ADMIN &&
         tokenData.role !== USER_ROLES.MENTOR &&
         tokenData.role !== USER_ROLES.GESTOR
       ) {
         throw new Error(
           "Somente mentores, gestores e administradores podem ver as avaliações compiladas."
         );
       }

      const compiled = await compiledEvaluationDatabase.getEvaluationCompiledByIdLeaguer(
        idLeaguer
      );

      return compiled;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
