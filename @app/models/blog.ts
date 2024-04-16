import { Timestamp } from 'firebase/firestore'

export type Reactions = {
    postId: string
    hearts: string[]
    thumbs: string[]
    fires: string[]
}

export type ReactionAttribute = keyof Omit<Reactions, 'postId'>

export type Saves = {
    userId: string
    courses: string[]
    podcasts: string[]
    posts: string[]
}
export type SavesAttribute = keyof Omit<Saves, 'userId'>
export type Post = {
    id: string
    author: string
    authorId: string
    title: string
    content: string
    coverImage: string
    createdAt: Timestamp
    updatedAt: Timestamp
    type: 'published' | 'drafted' | 'deleted'
    tags: string[]
}
