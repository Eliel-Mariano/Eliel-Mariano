import moment from "moment";

export class Leaguer {
  constructor(
    private id: string,
    private photo_leaguer: string,
    private position: string,
    private hiring_model: string,
    private name: string,
    private email: string,
    private phase: string,
    private technologies: string,
    private languages: string,
    private id_mentor: string,
    private id_manager: string,
    private id_admin: string,
    private name_class: string
  ) {}

  static toLeaguerModel(leaguer: any): Leaguer {
    return new Leaguer(
      leaguer.id,
      leaguer.photo_leaguer,
      leaguer.position,
      leaguer.hiring_model,
      leaguer.name,
      leaguer.email,
      leaguer.phase,
      leaguer.technologies,
      leaguer.languages,
      leaguer.id_mentor,
      leaguer.id_manager,
      leaguer.id_admin,
      leaguer.name_class
    );
  }
}

export interface LeaguerInputDTO {
  photo_leaguer: string;
  position: string;
  hiring_model: string;
  name: string;
  email: string;
  phase: string;
  technologies: string[];
  languages: string[];
  id_mentor: string;
  id_manager: string;
  id_admin: string;
  name_class: string;
}
