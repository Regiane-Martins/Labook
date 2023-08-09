import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/Post"
import { PostDB, PostUpdate } from "../types"
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

        return true
    }

    public async getAll() {
        const postDatabase = new PostDatabase()
        const result = await postDatabase.findPost()

        const post = result.map((post) => {
            return new Post(
                post.id,
                post.creator_id,
                post.content,
                post.likes,
                post.dislikes,
                post.created_at,
                post.updated_at
            )
        })

        return post
    }

    public async update(input: PostUpdate) {
        const {
            id,
            content
        } = input

        const postDatabase = new PostDatabase()
        await postDatabase.updatePost(id, content)
    }

    public async delete(id: string){

        const postDatabase = new PostDatabase()
        const result = await postDatabase.findPostById(id)

        if(!result){
            throw new Error("'Id' não encontrado.")
        }
        await postDatabase.delete(id)
    }
}