import { ProductBusiness } from "../src/business/ProductBusiness";
import { ProductsDatabaseMock } from "./mocks/ProductsDatabaseMock";

const productBusinessMock = new ProductBusiness(
    new ProductsDatabaseMock() as any
)

describe("Teste de cadastro de produtos", ()=>{

    test("Erro que vai retornar quando id, nome e tags estiverem vazios", async()=>{
        expect.assertions
        try {
            await productBusinessMock.create(
                {
                    id:0,
                    name:"",
                    tags: false
                }                
            )
        } catch (error:any) {
            expect(error.message).toEqual("Produto cadastrado no banco de dados!")
        }
    })

    test("Erro que vai retornar quando id estiver vazio", async()=>{
        expect.assertions
        try {
            await productBusinessMock.create(
                {
                    id:0,
                    name:"teste",
                    tags: []
                }                
            )
        } catch (error:any) {
            expect(error.message).toEqual("Insira os dados id, name e tags.")
        }
    })

    test("Erro que vai retornar quando name estiver vazio", async()=>{
        expect.assertions
        try {
            await productBusinessMock.create(
                {
                    id:1456,
                    name:"",
                    tags: ["teste"]
                }                
            )
        } catch (error:any) {
            expect(error.message).toEqual("Insira os dados id, name e tags.")
        }
    })

    test("Erro que vai retornar quando tags estiver vazio", async()=>{
        expect.assertions
        try {
            await productBusinessMock.create(
                {
                    id:1456,
                    name:"teste",
                    tags: false
                }                
            )
        } catch (error:any) {
            expect(error.message).toEqual("Insira os dados id, name e tags.")
        }
    })
})

describe("Teste de busca de produtos", ()=>{

    test("Erro que vai retornar o pruduto buscado por id.", async()=>{
        expect.assertions
        try {
            const result = await productBusinessMock.findProduct(6, null, null)

            expect(result).toEqual({
                id:6,
                name:"teste",
                tags:[]
            })

        } catch (error:any) {
            console.log(error);
        }
    })

    test("Erro que vai retornar o pruduto buscado por name.", async()=>{
        expect.assertions
        try {
            const result = await productBusinessMock.findProduct(null, "teste", null)

            expect(result).toEqual({
                id:6,
                name:"teste",
                tags:[]
            })

        } catch (error:any) {
            console.log(error);
        }
    })

    test("Erro que vai retornar o pruduto buscado por tag.", async()=>{
        expect.assertions
        try {
            const result = await productBusinessMock.findProduct(null, null, [])

            expect(result).toEqual({
                id:6,
                name:"teste",
                tags:[]
            })

        } catch (error:any) {
            console.log(error);
        }
    })
})