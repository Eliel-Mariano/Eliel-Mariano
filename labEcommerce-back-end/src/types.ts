export type Users = {
    id:string,
    name:string,
    email:string,
    password:string
}

export type Products = {
    id:string,
    name:string,
    price:number,
    image_url:string
}

export type History = {
    id:string,
    user_id:string,
    product_id:string,
    quantity:number,
    total_price:number
}