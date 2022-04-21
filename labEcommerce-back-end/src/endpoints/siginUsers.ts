import { Request, Response } from "express";
import { connection } from "../connection";


export const siginUsers  = ( async (req:Request, res:Response):Promise< void >=>{

    let statusCode:number = 400

    try {

        const {name, email, password} = req.body

        if (!name || !email || !password){
            statusCode = 405
            throw new Error("Insira name, email e password.")
        }

        await connection.raw(`
            INSERT INTO labecommerce_users
                (id, name, email, password)
            VALUES (
                ${Date.now().toString()},
                "${name}",
                "${email}",
                "${password}"
            );        
        `)

        statusCode=201
        res.status(statusCode).send("Usuário cadastrado com sucesso!")

    } catch (error:any) {
        res.status(statusCode).send(error.message)
    }
})