import { SignupOutputDTO } from "../types/signupOutputDTO";

export interface IProductData{
    findById(id: number):Promise<SignupOutputDTO>
    create(input:any):Promise<void>
    findProduct(id?:number, name?:string, tag?:string):Promise<SignupOutputDTO>
}