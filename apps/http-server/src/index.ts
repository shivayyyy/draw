import express from "express"
const app=express();

app.listen(3001);

app.post("/signup",async(req,res)=>{
    //get user data from body
    //hash the pass
    //db call(add to db)
    //generate token and send it to header
    res.status(201).json({message:"successfully signed up"})
})

app.post("/login",async(req,res)=>{
    //get the input from the body
    //parse the encrypted pass
    //check in db
    //send the token in header 
    res.status(200).json({message:"successfully logged in"})
})

app.post("/create-room",async(req,res)=>{
    //TODO:
    res.status(200).json({message:"room created successfully"})
    
})