import {z} from "zod"


export const createUserSchema=z.object({
    username:z.string().min(3).max(15),
    password:z.string().min(8).max(12),
    name:z.string(),
})
export const loginSchema=z.object({
    username:z.string().min(3).max(15),
    password:z.string().min(8).max(12)
    
})
export const createRoomSchema=z.object({
    
    name:z.string().min(8).max(25)
})