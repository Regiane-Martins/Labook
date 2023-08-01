import express, { Request, Response } from 'express'
import { PostDatabase } from '../database/PostDatabase'
import { Post } from '../models/Post'

export class PostController {
    public async post(req: Request, res: Response){
        try {
            const {id, content} = req.body

            if(typeof content !== "string") {
                throw new Error("Conteudo deve ser em formato de texto.")
            }

            const postDatabase = new PostDatabase()
            const postExist = await postDatabase.findPostById(id)

            if(postExist){
                throw new Error("Post já registrado.")
            }

            // const newPost = new Post(
            //     id,
            //     creator_id,
            //     content,
            //     likes,
            //     dislikes,
            //     new Date().toISOString(),
            //     new Date().toISOString()
            // )

            



            
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }

    }
}