export type leaguerType = {
  id: string;
  photo_leaguer?: string;
  position: string;
  hiring_model: string;
  name: string;
  email: string;
  phase: string;
  technologies: string;
  languages?: string;
  id_mentor?: string;
  id_manager?: string;
  id_admin?: string;
  name_class: string;
};
export type editLeaguerType = {
  photo_leaguer?: string;
  position?: string;
  hiring_model?: string;
  name?: string;
  phase?: string;
  technologies?: string;
  languages?: string;
  id_mentor?: string;
  id_manager?: string;
  id_admin?: string;
};
