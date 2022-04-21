import { Request, Response } from "express";
import { connection } from "../connection";
import { History } from "../types";


export const getHistoryUsers  = ( async (req:Request, res:Response):Promise< void >=>{

    let statusCode:number = 400

    const user_id = req.params.user_id

    try {

        if(!user_id){
            statusCode = 404
            throw new Error ("Insira o parâmetro :user_id.")
        }

        const result:History[] = await connection.raw(` 
            SELECT * FROM labecommerce_purchases
            WHERE user_id = ${user_id}
        `)

        if(result.length === 0){
            statusCode = 404
            throw new Error("Nenhuma compra cadastrada.")
        }
        
        statusCode=200
        res.status(statusCode).send(result[0])

    } catch (error:any) {
        res.status(statusCode).send(error.message)
    }
})