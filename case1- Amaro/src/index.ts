import { ProductBusiness } from "./business/ProductBusiness"
import {app} from "./controller/app"
import { ProductContoller } from "./controller/ProductController"
import { ProductDatabase } from "./data/ProductDatabase"


const productController = new ProductContoller(
    new ProductBusiness(
        new ProductDatabase
    )
)

app.post("/", productController.create)
app.get("/products", productController.findProduct)
