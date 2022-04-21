import { Request, Response } from "express";
import { connection } from "../connection";


export const purchasesRegister  = ( async (req:Request, res:Response):Promise< void >=>{

    let statusCode:number = 400

    try {

        const {user_id, product_id, quantity} = req.body

        if (!user_id || !product_id || !quantity){
            statusCode = 405
            throw new Error("Insira user_id, product_id e quantity.")
        }

        let price = await connection.raw(`
            SELECT price FROM labecommerce_products
            WHERE id = ${product_id}
        `)
        price = price.flat(1)[0].price

        await connection.raw(`
            INSERT INTO labecommerce_purchases
                (id, user_id, product_id, quantity, total_price)
            VALUES (
                ${Date.now().toString()},
                "${user_id}",
                "${product_id}",
                "${quantity}",
                ${price * quantity}           
            );        
        `)

        statusCode=201
        res.status(statusCode).send("Compra registrada com sucesso!")

    } catch (error:any) {
        res.status(statusCode).send(error.message)
    }
})