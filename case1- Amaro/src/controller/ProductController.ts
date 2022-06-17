import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { SignupInputDTO } from "../types/signupInputDTO";


export class ProductContoller{
    constructor(
        private productBusiness: ProductBusiness
    ){}

    create = async (req:Request, res:Response):Promise< any >=>{

        try {
            const {id, name, tags} = req.body

            const input: SignupInputDTO ={
                id,
                name,
                tags
            }
            
            await this.productBusiness.create(input) 

            res.status(201).send({message:"Produto cadastrado com sucesso!"})

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no cadastro")
        }
    }

    findProduct = async (req:Request, res:Response):Promise< any >=>{
        try {
            const id = req.query.id
            const name = req.query.name
            const tag = req.query.tag

            const result = await this.productBusiness.findProduct(id, name, tag)
           
            return res.status(200).send(result)

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro na busca")
        }
    }
}