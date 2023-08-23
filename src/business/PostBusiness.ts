import { PostDatabase } from "../database/PostDatabase"
import { PostCreateInputDTO } from "../dtos/postCreate.dto"
import { PostDeleteInputDTO } from "../dtos/postDelete.dto"
import { PostGetAllOutputDTO } from "../dtos/postGetAll.dto"
import { PostUpdateInputDTO } from "../dtos/postUpdate.dto"
import { TokenCheckInputDTO } from "../dtos/tokenCheck.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { USER_ROLES } from "../models/User"
import { IdGenerator } from "../service/IdGenerator"
import { TokenManager } from "../service/TokenManager"
import { PostDB } from "../types"


export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }


    public create = async (input: PostCreateInputDTO): Promise<void> => {
        const id = this.idGenerator.generate()

        const { content, token } = input

        const result = this.tokenManager.getPayload(token)

        if (!result) {
            throw new Error("token invalido.")
        }

        const postCreateDB: PostDB = {
            id,
            content,
            creator_id: result.id,
            likes: 0,
            dislikes: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        await this.postDatabase.createPost(postCreateDB)
    }

    public getAll = async (input: TokenCheckInputDTO): Promise<PostGetAllOutputDTO[]> => {

        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token invalido.")
        }

        const result = await this.postDatabase.findPost()

        const output: PostGetAllOutputDTO[] = result.map((item) => ({
            id: item.id,
            content: item.content,
            likes: item.likes,
            dislikes: item.dislikes,
            created_at: item.created_at,
            updated_at: item.updated_at,
            creator: {
                id: item.userId,
                name: item.userName
            }
        }));

        return output
    }

    public update = async (input: PostUpdateInputDTO) => {

        const {
            id,
            content,
            token
        } = input

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("token invalido.")
        }
        const postDB = await this.postDatabase.findPostById(id)

        if (!postDB) {
            throw new BadRequestError("id invalido.")
        }


        if (payload.id !== postDB.creator_id) {
            throw new BadRequestError("id incorreto.")
        }

        await this.postDatabase.updatePost(id, content)
    }

    public delete = async (input: PostDeleteInputDTO) => {

        const { id, token } = input

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("token invalido.")
        }

        const result = await this.postDatabase.findPostById(id)

        if (!result) {
            throw new BadRequestError("'Id' não encontrado.")
        }

        if (payload.id === result.creator_id || payload.role === USER_ROLES.ADMIN) {
            await this.postDatabase.delete(id)
        }else{
            throw new BadRequestError("acesso negado")
        }

    }
}