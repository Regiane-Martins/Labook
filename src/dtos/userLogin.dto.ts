import { z } from "zod"

export interface UserLoginInputDTO {
    email: string,
    password: string,
}

export interface UserLoginOutputDTO {
    token: "um token jwt"
}

export const userLoginSchema = z.object({
    email: z.string({
        required_error: "'email' é obrigatório",
        invalid_type_error: "'email' deve ser do tipo string"
    }).email("'email' inválido"),
    password: z.string({
        required_error: "'password' é obrigatório",
        invalid_type_error: "'password' deve ser do tipo string"
    }).min(5, "'password' deve possuir no mínimo 5 caracteres"),
}).transform(data => data as UserLoginInputDTO)