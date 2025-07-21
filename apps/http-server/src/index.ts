import express from "express"
import { getUser } from "./getUser";
import {createUserSchema} from "@repo/common/zodTypes"
import {prismaClient} from "@repo/database/client"

import bcrypt, { hash } from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

const app=express();
app.use(express.json())

app.listen(3001);

app.post("/signup",async(req,res)=>{
    const data=createUserSchema.safeParse(req.body);
    if(!data){
        res.json({
            message:"incorrect inputs"
        })
        return
    }
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
        const userData={email,
            password:hashedPass,
            name}
       const newUser= prismaClient.user.create({
        data:{
            
            ...userData
        }
       })
       //generate token and send it to header
    const token=jwt.sign(userData,JWT_SECRET)
    } catch (error) {
        res.send({success:false,message:"error while saving user"})
        
    }
    
    
    res.status(201).json({message:"successfully signed up"})
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
    res.status(200).json({message:"successfully logged in"})
})

app.post("/create-room",getUser,async(req,res)=>{
    //TODO:
    res.status(200).json({message:"room created successfully"})
    
})