import { BaseDatabase } from "./BaseDatabase";

const printError = (error: any) => {
  console.log(error.sqlMessage || error.message);
};

export class CreateTables extends BaseDatabase {
  createTables = () =>
    this.connection
      .raw(
        `
    CREATE TABLE IF NOT EXISTS class_meta(
    id VARCHAR(255) PRIMARY KEY,
    team_name VARCHAR(255) UNIQUE NOT NULL
);

    CREATE TABLE IF NOT EXISTS leaguer_meta(
    id VARCHAR(255) PRIMARY KEY,
    photo_leaguer TEXT,
    position VARCHAR(255) NOT NULL,
    hiring_model VARCHAR(255) NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phase VARCHAR(255) NOT NULL default "Introdução",
    technologies VARCHAR(255) NOT NULL,
    languages VARCHAR(255),
    id_mentor VARCHAR(255),
    id_manager VARCHAR(255),
    id_admin VARCHAR(255),
    name_class VARCHAR(255) NOT NULL,
    FOREIGN KEY (name_class) REFERENCES class_meta(team_name)
);

    CREATE TABLE IF NOT EXISTS responsible_meta(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT "GESTOR"
);


    CREATE TABLE IF NOT EXISTS feedbacks_compiled_meta(
    id VARCHAR(255) PRIMARY KEY,
    email_creator_compiled VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (email_creator_compiled) REFERENCES responsible_meta(email),
    email_leaguer VARCHAR(255) NOT NULL,
    FOREIGN KEY (email_leaguer) REFERENCES leaguer_meta(email),
    created_at DATE NOT NULL,
    performance float NOT NULL,
    quality_on_delivery float NOT NULL,
    proactivity float NOT NULL,
    commitment float NOT NULL,
    team_work float NOT NULL,
    skillset_growth float NOT NULL,
    leadership float NOT NULL,
    punctuality float NOT NULL,
    work_under_pressure float NOT NULL,
    participation float NOT NULL,
    administrative_tasks float NOT NULL,
    highlights_leaguer TEXT,
    comment TEXT
);

    CREATE TABLE IF NOT EXISTS create_feedback_meta(
    id VARCHAR(255) PRIMARY KEY,
    email_leaguer VARCHAR(255) NOT NULL,
    FOREIGN KEY (email_leaguer) REFERENCES leaguer_meta(email),
    email_creator VARCHAR(255) NOT NULL,
    FOREIGN KEY (email_creator) REFERENCES responsible_meta(email),
    email_evaluators VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL
);

    CREATE TABLE IF NOT EXISTS received_feedbacks_meta(
    id VARCHAR(255) PRIMARY KEY,
    leaguer_email VARCHAR (255) NOT NULL,
    FOREIGN KEY (leaguer_email) REFERENCES leaguer_meta(email),
    email_creator_feedback VARCHAR(255) NOT NULL,
    FOREIGN KEY (email_creator_feedback) REFERENCES create_feedback_meta(email_creator),
    email_evaluator VARCHAR(255) UNIQUE NOT NULL,
    created_at_ DATE NOT NULL,
    performance float NOT NULL,
    quality_on_delivery float NOT NULL,
    proactivity float NOT NULL,
    commitment float NOT NULL,
    team_work float NOT NULL,
    skillset_growth float NOT NULL,
    leadership float NOT NULL,
    punctuality float NOT NULL,
    work_under_pressure float NOT NULL,
    participation float NOT NULL,
    administrative_tasks float NOT NULL,
    highlights_leaguer TEXT,
    comment TEXT
);

   `
      )
      .then(() => {
        console.log("Tables created successfully!!");
      })
      .catch(printError);

  closeConnection = () => {
    this.connection.destroy();
  };
}
const migrations = new CreateTables();

migrations.createTables().finally(migrations.closeConnection);
