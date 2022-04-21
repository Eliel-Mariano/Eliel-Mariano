import { Request, Response } from "express";
import { connection } from "../connection";
import { Products } from "../types";


export const getProducts  = ( async (req:Request, res:Response):Promise< void >=>{

    let statusCode:number = 400

    try {
        const result:Products[] = await connection.raw(`
            SELECT * FROM labecommerce_products
        `)

        if(result.length === 0){
            statusCode=404
            throw new Error("Nenhum produto cadastrado.")
        }
        
        statusCode=200
        res.status(statusCode).send(result[0])
        console.log(result[0])

    } catch (error:any) {
        res.status(statusCode).send(error.message)
    }
})