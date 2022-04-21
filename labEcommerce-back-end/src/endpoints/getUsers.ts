import { Request, Response } from "express";
import { connection } from "../connection";
import { Users } from "../types";


export const getUsers  = ( async (req:Request, res:Response):Promise< void >=>{

    let statusCode:number = 400

    try {
        const result:Users[] = await connection.raw(`
            SELECT * FROM labecommerce_users
        `)

        if(result.length === 0){
            statusCode=404
            throw new Error("Nenhum usuário cadastrado.")
        }
        
        statusCode=200
        res.status(statusCode).send(result[0])

    } catch (error:any) {
        res.status(statusCode).send(error.message)
    }
})