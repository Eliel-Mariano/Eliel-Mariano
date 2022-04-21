import { Request, Response } from "express";
import { connection } from "../connection";


export const siginProducts = ( async (req:Request, res:Response):Promise< void >=>{

    let statusCode:number = 400

    try {

        const {name, price, image_url} = req.body

        if (!name || !price || !image_url){
            statusCode = 405
            throw new Error("Insira name, price, image_url.")
        }

        await connection.raw(`
            INSERT INTO labecommerce_products
                (id, name, price, image_url)
            VALUES (
                ${Date.now().toString()},
                "${name}",
                "${price}",
                "${image_url}"
            );        
        `)

        statusCode=201
        res.status(statusCode).send("Produto cadastrado com sucesso!")

    } catch (error:any) {
        res.status(statusCode).send(error.message)
    }
})