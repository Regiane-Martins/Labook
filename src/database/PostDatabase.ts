import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POST = "post"

    public async findPostById(id: string): Promise<PostDB | undefined>{
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POST).where({id})

        if(!result){
            return undefined
        }

        const post: PostDB = {
            id: result.id,
            creator_id: result.creator_id,
            content: result.content,
            likes: result.likes,
            dislikes: result.dislikes,
            created_at: result.created_at,
            updated_at: result.updated_at         
        }

        return post
    }

    public async createPost(newPostDB: PostDB): Promise<PostDB[]>{
       const result: PostDB[]= await BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPostDB)
       return result
    }
}