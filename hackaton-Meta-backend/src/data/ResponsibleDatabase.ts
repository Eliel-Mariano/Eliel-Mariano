import { Responsibles } from "../model/Responsible";
import { BaseDatabase } from "./BaseDatabase";

export class ResponsibleDatabase extends BaseDatabase {
  private static TABLE_NAME = "responsible_meta";

  public async create(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.connection(ResponsibleDatabase.TABLE_NAME).insert({
        id,
        name,
        email,
        password,
        role,
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findUserByEmail(email: string) {
    try {
      const user = await this.connection(ResponsibleDatabase.TABLE_NAME)
        .select("*")
        .where({ email: email });
      return user[0] && Responsibles.toShowModel(user[0]);
    } catch (error: any) {
      console.log(error);
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async findUserById(id: string) {
    try {
      const user = await this.connection(ResponsibleDatabase.TABLE_NAME)
        .select("*")
        .where({ id: id });
      return user[0] && Responsibles.toShowModel(user[0]);
    } catch (error: any) {
      console.log(error);
      throw new Error(error.sqlMessage || error.message);
    }
  }

  editRole = async (id: string, role: string) => {
    await this.connection.raw(`
    UPDATE responsible_meta
      SET role = "${role}"
      WHERE id = "${id}"
    `);
  };

  public async getAllResponsibles(): Promise<Responsibles[]> {
    try {
      const result = await this.connection(ResponsibleDatabase.TABLE_NAME)
        .select("*")
        .from(ResponsibleDatabase.TABLE_NAME);

      return result.map((responsibles) =>
        Responsibles.toShowModel(responsibles)
      );
    } catch (e: any) {
      throw new Error(e.sqlMessage || e.message);
    }
  }
}
