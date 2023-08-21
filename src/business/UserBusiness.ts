import { UserDatabase } from "../database/UserDatabase"
import { userCreateInputDTO, userCreateOutputDTO } from "../dtos/userCreate.dto"
import { UserLoginInputDTO, UserLoginOutputDTO } from "../dtos/userLogin.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"
import { USER_ROLES, User } from "../models/User"
import { IdGenerator } from "../service/IdGenerator"
import { TokenManager, TokenPayload } from "../service/TokenManager"
import { UserDB } from "../types"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public create = async (input: userCreateInputDTO): Promise<userCreateOutputDTO> => {
        const { name, email, password } = input

        const id = this.idGenerator.generate()

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

        await this.userDatabase.creatUser(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: userCreateOutputDTO = {
            message: "CREATED",
            token: token
        }
        return output
    }

    public getAllUsers = async () => {
        const result = await this.userDatabase.findUser()

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

    public login = async (input: UserLoginInputDTO): Promise<UserLoginOutputDTO> => {

        const { email, password } = input


        const user = await this.userDatabase.findUserByEmail(email)

        if (!user) {
            throw new ConflictError("Email de usuário não encontrado.")
        }


        if (password !== user.password) {
            throw new ConflictError("Senha incorreta.")
        }

        const tokenPayload: TokenPayload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: UserLoginOutputDTO = {
            token: token
        }

        return output

    }
}