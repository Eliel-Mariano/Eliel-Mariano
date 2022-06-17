import { Leaguer } from "../model/Leaguer";
import { editLeaguerType, leaguerType } from "../types/leaguerType";
import { BaseDatabase } from "./BaseDatabase";

export class LeaguerDatabase extends BaseDatabase {
  private static TABLE_NAME = "leaguer_meta";

  findByEmail = async (email: string): Promise<any> => {
    const user = await this.connection.raw(`
        SELECT * FROM leaguer_meta
        WHERE email = "${email}";
    `);
    return user[0];
  };

  create = async (leaguer: leaguerType) => {
    await this.connection.raw(`
    INSERT INTO leaguer_meta (id, photo_leaguer, position, hiring_model, name, email, phase, technologies, languages, id_mentor, id_manager, id_admin, name_class)
        VALUES (
            "${leaguer.id}",
            "${leaguer.photo_leaguer}",
            "${leaguer.position}",
            "${leaguer.hiring_model}",
            "${leaguer.name}",
            "${leaguer.email}",
            "${leaguer.phase}",
            "${leaguer.technologies}",
            "${leaguer.languages}",
            "${leaguer.id_mentor}",
            "${leaguer.id_manager}",
            "${leaguer.id_admin}",
            "${leaguer.name_class}"
        );
    `);
  };
  public async getLeaguerByEmail(email: string): Promise<Leaguer> {
    try {
      const result = await this.connection(LeaguerDatabase.TABLE_NAME)
        .select("*")
        .where({ email: email });
      return result[0] && Leaguer.toLeaguerModel(result[0]);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
  public async getLeaguerById(id: string): Promise<Leaguer> {
    try {
      const result = await this.connection(LeaguerDatabase.TABLE_NAME)
        .select("*")
        .where({ id: id });

      return result[0] && Leaguer.toLeaguerModel(result[0]);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
  public async getAllLeaguers(): Promise<Leaguer[]> {
    try {
      const result = await this.connection(LeaguerDatabase.TABLE_NAME)
        .select("*")
        .from(LeaguerDatabase.TABLE_NAME);

      return result.map((leaguer) => Leaguer.toLeaguerModel(leaguer));
    } catch (e: any) {
      throw new Error(e.sqlMessage || e.message);
    }
  }

  editLeaguer = async (leaguer: editLeaguerType, idLeaguer: any) => {
    await this.connection.raw(`
    UPDATE leaguer_meta
      SET photo_leaguer = "${leaguer.photo_leaguer}",
      position = "${leaguer.position}",
      hiring_model = "${leaguer.hiring_model}",
      name = "${leaguer.name}",
      phase = "${leaguer.phase}", 
      technologies = "${leaguer.technologies}", 
      languages = "${leaguer.languages}", 
      id_mentor = "${leaguer.id_mentor}", 
      id_manager = "${leaguer.id_manager}", 
      id_admin = "${leaguer.id_admin}"
      WHERE id = "${idLeaguer}"
    `);
  };

  deleteLeaguer = async (idLeaguer: any) => {
    await this.connection.raw(`
    DELETE FROM leaguer_meta
    WHERE id = "${idLeaguer}"
    `);
  };
}
