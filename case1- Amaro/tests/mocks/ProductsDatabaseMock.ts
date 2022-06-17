import { Product } from "../../src/model/Products";
import {productMock} from "./productMock"


export class ProductsDatabaseMock{
    public async create(product:Product):Promise<void>{}

    public async findProduct(id?:number, name?:string, tag?:[]):Promise<any>{
        if(id === 6){
            return productMock
        }
        if(name === "teste"){
            return productMock
        }
        if(tag === []){
            return productMock
        }
    }
}
