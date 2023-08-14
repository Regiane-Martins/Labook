import { UserDatabase } from "../database/UserDatabase"
import { userCreateInputDTO, userCreateOutputDTO } from "../dtos/userCreate.dto"
import { UserLoginInputDTO, UserLoginOutputDTO } from "../dtos/userLogin.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"
import { USER_ROLES, User } from "../models/User"
import { UserDB} from "../types"

export class UserBusiness {
    public async create(input: userCreateInputDTO): Promise<userCreateOutputDTO>{
        const {id, name, email, password} = input


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

        const output: userCreateOutputDTO = {
            message: "CREATED",
            user: {
              id: newUser.getId(),
              name: newUser.getName(),
              email: newUser.getEmail()
            }
          }
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

    public async login(input: UserLoginInputDTO): Promise<UserLoginOutputDTO>{

        const {email, password} = input

        const userDatabase = new UserDatabase()
        const user = await userDatabase.findUserByEmail(email)

        if (!user) {
            throw new ConflictError("Email de usuário não encontrado.")
        }


        if (password === user.password) {
            const output: UserLoginOutputDTO = {
                token: "um token jwt"
            }
            return output
        } else {
            throw new BadRequestError("Senha incorreta")
        }
    }
}