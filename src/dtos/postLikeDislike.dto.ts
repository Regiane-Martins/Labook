import { z } from "zod"

export interface PostLikeDislikeInputDTO {
    id: string,
    like: boolean,
    token: string
}

export const likeDislikeSchema = z.object({
    id: z.string().min(2),
    like: z.boolean(),
    token: z.string().min(2)
}).transform(data => data as PostLikeDislikeInputDTO)