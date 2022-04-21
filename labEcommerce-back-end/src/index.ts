import {app} from "./app"
import { getHistoryUsers } from "./endpoints/getHistoryUsers"
import { getProducts } from "./endpoints/getPorducts"
import { getUsers } from "./endpoints/getUsers"
import { purchasesRegister } from "./endpoints/purchasesRegister"
import { siginProducts } from "./endpoints/siginProducts"
import { siginUsers } from "./endpoints/siginUsers"

app.post("/users", siginUsers)

app.get("/users", getUsers)

app.post("/products", siginProducts)

app.get("/products", getProducts)

app.post("/purchases", purchasesRegister)

app.get("/users/:user_id/purchases", getHistoryUsers)