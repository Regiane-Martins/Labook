import { UserDatabase } from "../database/UserDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"
import { USER_ROLES, User } from "../models/User"
import { UserCreate, UserDB, UserLogin } from "../types"

export class UserBusiness {
    public async create(input: UserCreate){
        const {id, name, email, password} = input

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new BadRequestError("'Id'deve ser uma string")
            }
            if (typeof name !== "string") {
                throw new BadRequestError("'Name'deve ser uma string")
            }
            if (typeof email !== "string") {
                throw new BadRequestError("'E-mail'deve ser uma string")
            }
            if (typeof password !== "string") {
                throw new BadRequestError("'Password'deve ser uma string")
            }

        }

        const userDatabase = new UserDatabase()
        const userExist = await userDatabase.findUserById(id)

        if (userExist) {
            throw new ConflictError("'Id'já existente.")
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: USER_ROLES.NORMAL,
            created_at: newUser.getCreatedAt()
        }

        await userDatabase.creatUser(newUserDB)
        const output = {message: "Usuário cadastrado com sucesso!"}
        return output
    }

    public async getAllUsers(){
        const userDatabase = new UserDatabase()
            const result = await userDatabase.findUser()

            const users = result.map((user) => {
                return new User(
                    user.id,
                    user.name,
                    user.email,
                    user.password,
                    USER_ROLES.NORMAL,
                    user.created_at
                )

            })

            return users
    }

    public async login(input: UserLogin){

        const {email, password} = input

        if (typeof email !== undefined) {
            if (typeof email !== "string") {
                throw new BadRequestError("Email deve ser uma string.")
            }

            if (typeof password !== "string") {
                throw new BadRequestError("Password deve ser uma string.")
            }
        }

        if (!email || !password) {
            throw new BadRequestError("Todos os campos são obrigatórios.")
        }

        const userDatabase = new UserDatabase()
        const user = await userDatabase.findUserByEmail(email)

        if (!user) {
            throw new ConflictError("Email de usuário não encontrado.")
        }


        if (password === user.password) {
            const message = "Entrou"
            return message
        } else {
            throw new BadRequestError("Senha incorreta")
        }
    }
}