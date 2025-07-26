import express,{Request} from "express"
import { getUser } from "./getUser";
import {createUserSchema} from "@repo/common/zodTypes"
import {prismaClient} from "@repo/database/client"

import bcrypt, { hash } from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import cookieParser from "cookie-parser"


interface newReq extends Request{
    userId:string
}

const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(express.json())


app.listen(3001);

app.post("/signup",async(req,res)=>{
    
    //get user data from body
    const {name,email,password}=req.body;
    //search for email in db
    const isFound=await prismaClient.user.findFirst({
        where:{
            email,
        }
    })
    if(isFound){
        res.status(411).json({message:"this email already exist try to login"})
    }
    //hash the pass
    const hashedPass=await bcrypt.hash(password,12)

    //db call(add to db)
    try {
        
       const newUser= await prismaClient.user.create({
       data:{
            email,
            password:hashedPass,
            name,
       }
       })
       
       //generate token and send it to header
    const token=jwt.sign(newUser,JWT_SECRET)
    console.log(token)
    //send cookies
    res.cookie('token', token, {
    httpOnly: true,           
       
    maxAge: 1000 * 60 * 60 * 24, 
  })

  console.log("after sending cookie checking error")
     return res.json({message:"new User created"})
    } catch (error) {
        
        res.send({success:false,message:"error while saving user"})
        
    }
    
    
    
})

app.post("/login",async(req,res)=>{
    //get the input from the body
    const {email,password}=req.body;
    //check for user existense
    const registeredUser=await prismaClient.user.findFirst({
        where:{
            email:email
        }
    })
    if(!registeredUser){
        res.status(404).json({message:"dont exist in our db"})
        return;
       }
    //parse the encrypted pass
    const hashedPass=await bcrypt.compare(password,registeredUser.password)
    if(!hashedPass){
        res.json({message:"hashed pass not verified"})
        return;
    }
    
    //send the token in header 

    const token=await jwt.sign(registeredUser,JWT_SECRET)
    res.cookie("token",token)
    res.status(200).json({message:"successfully logged in"})
})

app.post("/room",getUser,async(req,res)=>{
    const {slug}=req.body;
    const userId=(req as newReq).userId
    if(!userId)return;
    //search for the same slug
    const isSlugPresent=await prismaClient.room.findFirst({
        where:{
            slug,
            adminId:userId
        }
    })
    if(isSlugPresent) return;
    //add the room to db
    const savedRoom=await prismaClient.room.create({
        data:{
            slug,
            admin:{
                connect:{
                    id:userId
                }
            },
        }
    })
    if(!savedRoom){
        res.json({error:"fail to asve the room"})
    }
    //return room id
    const roomId=savedRoom.id;
    

    
    
     return res.status(200).json({message:"room created successfully",room_id:roomId})
    
})


app.post("/chat/:roomId",getUser,async(req,res)=>{
    const roomId=Number(req.params.roomId);
    const geChatLogs=await prismaClient.chat.findMany({
        where:{
            roomId,
        },
        take:50,
        orderBy:{
            id:"desc"
        }
    })

    res.json({geChatLogs})

})