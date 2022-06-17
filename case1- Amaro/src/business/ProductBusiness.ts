import { IProductData } from "../model/IProductaData"
import { SignupInputDTO } from "../types/signupInputDTO"
import { SignupOutputDTO } from "../types/signupOutputDTO"
import products from "./products.json"


export class ProductBusiness{
    private productDatabase: IProductData

    constructor (productDataRepository:IProductData){
        this.productDatabase = productDataRepository
    }

    create = async (input:any):Promise<string | undefined>=>{

        const {id, name, tags} = input

        if(!id && !name && !tags){
            for (let i=0; i<=products.products.length-1; i++) {
                await this.productDatabase.create(products.products[i])
                console.log(products.products[i]);
                
            }
            return "Produto cadastrado no banco de dados!"

        } else {
            if(!id || !name || !tags){
                throw new Error("Insira os dados id, name e tags.")
            }

            const registeredProduct = await this.productDatabase.findById(id)
            if(registeredProduct){
            throw new Error("Produto com esse id já cadastrado!")
            }            
        }
        await this.productDatabase.create(input)
    }

    findProduct = async (id:any, name:any, tag:any):Promise<SignupOutputDTO>=>{
        const idProduct = Number(id)
                
        const result = await this.productDatabase.findProduct(idProduct, name, tag)

        return result
    }
}