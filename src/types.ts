export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}

export interface UserCreate {
    id: string,
    name: string,
    email: string,
    password: string,
}

export interface UserLogin{
    email: string,
    password: string,
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface PostUpdate{
    id: string,
    content: string,
}


export interface CreatorDB {
    id: string,
    name: string
}

export interface PostUserDB extends PostDB {
    creator: CreatorDB
}


