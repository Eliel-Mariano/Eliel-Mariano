import { ResponsibleDatabase } from "../data/ResponsibleDatabase";
import { Authenticator } from "../services/Authenticator";
import { Idgenerator } from "../services/IdGenerator";
import { FeedbackDatabase } from "../data/FeedbackDatabase";
import { USER_ROLES } from "../model/User_Roles";
import { FeedbackInputDTO } from "../model/Feedback";

export class FeedbackBusiness {
  async createFeedback(
    input: FeedbackInputDTO,
    token_headers: string
  ): Promise<string> {
    try {
      //generating id
      const idGenerator = new Idgenerator();
      const id = idGenerator.generateId();

      //created at
      const created_at = new Date();

      //verifying input and token
      if (
        !input.email_leaguer ||
        !input.email_creator ||
        !input.email_evaluators ||
        typeof input.email_creator === "number" ||
        typeof input.email_leaguer === "number" ||
        typeof input.email_evaluators === "number"
      )
        throw new Error(
          "Um ou mais campos inválidos, certifique-se de que 'name_leaguer', 'email_creator' e 'email_evaluators' são strings."
        );
      if (
        input.email_evaluators.indexOf("@") === -1 ||
        input.email_creator.indexOf("@") === -1
      ) {
        throw new Error("Email inválido.");
      }
      if (!token_headers) {
        throw new Error(
          "Esse endpoint requer um token no headers authorization."
        );
      }

      //validating user creator email
      const responsibleDatabase = new ResponsibleDatabase();
      const isRegisteredUser = await responsibleDatabase.findUserByEmail(
        input.email_creator
      );
      if (!isRegisteredUser) {
        throw new Error("Usuário não cadastrado.");
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
          "Somente administradores, gestores e mentores podem criar novas avaliações."
        );
      }

      //creating feedback
      const feedbackDatabase = new FeedbackDatabase();
      await feedbackDatabase.createFeedback(
        id,
        input.email_leaguer,
        input.email_creator,
        input.email_evaluators,
        created_at
      );

      //token generator
      const tokenGen = authenticator.generateToken({
        id: id,
        role: tokenData.role,
      });
      
      return tokenGen;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
