import { z } from "zod"

export interface userCreateInputDTO {
    id: string,
    name: string,
    email: string,
    password: string
}

export interface userCreateOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string
    }
}


export const userCreateSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: "'name' deve ser do tipo string"
    }).min(2),
    email: z.string({
        invalid_type_error: "'email' deve ser do tipo string"
    }).email("'email' inválido"),
    password: z.string({
        invalid_type_error: "'password' deve ser do tipo string"
    }).min(5, "'password' deve possuir no mínimo 5 caracteres")
}).transform(data => data as userCreateInputDTO)