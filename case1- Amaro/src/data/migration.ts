import { BaseDatabase } from "./BaseDatabase"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

export class CreateTables extends BaseDatabase{
   createTables = () => this.connection.raw(`
      CREATE TABLE IF NOT EXISTS products (
         id INT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         tags VARCHAR(255) NOT NULL
      );      
   `)

   .then(() => { console.log("Tables created successfully!!") })
   .catch(printError)

   closeConnection = () => { this.connection.destroy() }

}
const migrations = new CreateTables()

migrations.createTables()
   .finally(migrations.closeConnection)