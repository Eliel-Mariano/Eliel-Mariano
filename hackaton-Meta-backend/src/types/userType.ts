enum TypeUser {
    ADMIN = "ADMIN",
    USER = "USER"
}

export type User = {
    name:string
	email:string
	password:string
	role:TypeUser
}

export type login = {
	email:string
	password:string
}
	
export type Leaguer = {
    name:string
	email:string
	password:string
	role:TypeUser
}
