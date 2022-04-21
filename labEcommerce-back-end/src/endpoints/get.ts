import { Request, Response } from "express";


export const funcaoGet  = ( async (req:Request, res:Response):Promise< any >=>{

    let statusCode:number = 400

    try {
        
        //validar todas as requisições
        if ("condições"){
            statusCode = 1000
            throw new Error("mensagem de erro")
        }

        //consultar/inserir banco de dados
        await "código exigido pelo endpoint"

        //validar saídas do banco
        if ("condições"){
            statusCode = 1000
            throw new Error("mensagem de erro")
        }

        //responder a requisição
        statusCode = 1000
        res.status(statusCode).send("mensagem de sucesso!")

    } catch (error:any) {
        res.status(statusCode).send(error.message)
    }

})