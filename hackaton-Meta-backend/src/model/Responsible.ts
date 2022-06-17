import { USER_ROLES } from "./User_Roles";

export interface SignupResponsibleInputDTO {
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
}
export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface RoleInputDTO {
  id: string;
  role: USER_ROLES;
}

export class Responsibles {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES,
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role;
  }

  static toShowModel(data: any): Responsibles {
    return new Responsibles(
      data.id,
      data.name,
      data.email,
      data.password,
      data.role
    );
  }
}

export const stringToUserRole = (input: string): USER_ROLES => {
  switch (input) {
    case "ADMIN":
      return USER_ROLES.ADMIN;
    case "GESTOR":
      return USER_ROLES.GESTOR;
    case "MENTOR":
      return USER_ROLES.MENTOR;
    default:
      throw new Error("Role inválido, inserir: ADMIN, MENTOR OU GESTOR");
  }
};
