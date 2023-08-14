import { PostDatabase } from "../database/PostDatabase"
import { PostGetAllOutputDTO } from "../dtos/postGetAll.dto"
import { PostUpdateInputDTO } from "../dtos/postUpdate.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { PostDB } from "../types"
import { uuid } from "uuidv4"

export class PostBusiness {
    public async create(content: string, creatorId: string) {
        const post: PostDB = {
            id: uuid(),
            content,
            creator_id: creatorId,
            likes: 0,
            dislikes: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        const postDatabase = new PostDatabase()

        await postDatabase.createPost(post)

        const output = {
            message: "CREATED",
        }

        return output
    }
    public async getAll(): Promise<PostGetAllOutputDTO[]> {
        const postDatabase = new PostDatabase()
        const result = await postDatabase.findPost()

        console.log(result);


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

    public async update(input: PostUpdateInputDTO) {
        const {
            id,
            content
        } = input

        const postDatabase = new PostDatabase()
        await postDatabase.updatePost(id, content)
    }

    public async delete(id: string) {

        const postDatabase = new PostDatabase()
        const result = await postDatabase.findPostById(id)

        if (!result) {
            throw new BadRequestError("'Id' não encontrado.")
        }
        await postDatabase.delete(id)
    }
}