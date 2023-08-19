import { PostDatabase } from "../database/PostDatabase"
import { PostCreateInputDTO} from "../dtos/postCreate.dto"
import { PostGetAllOutputDTO } from "../dtos/postGetAll.dto"
import { PostUpdateInputDTO } from "../dtos/postUpdate.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { IdGenerator } from "../service/IdGenerator"
import { TokenManager } from "../service/TokenManager"
import { PostDB } from "../types"
import { uuid } from "uuidv4"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }


    public create = async (input: PostCreateInputDTO): Promise<void>  => {
        const id = this.idGenerator.generate()

        const {content, token} = input

        const result = this.tokenManager.getPayload(token)

        if(!result){
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

    public getAll = async (): Promise<PostGetAllOutputDTO[]> => {

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
            content
        } = input


        await this.postDatabase.updatePost(id, content)
    }

    public delete = async (id: string) => {


        const result = await this.postDatabase.findPostById(id)

        if (!result) {
            throw new BadRequestError("'Id' não encontrado.")
        }
        await this.postDatabase.delete(id)
    }
}