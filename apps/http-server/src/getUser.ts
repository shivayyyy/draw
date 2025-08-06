import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"


interface newReq extends Request{
    userId:string
}


export async function  getUser(req:Request,res:Response,next:NextFunction){

    

    const token=req.cookies?.token;
    
    if (!token || typeof token !== 'string') {
        return res.status(401).json({ error: 'Unauthorized: No token' })
    }
   

    const decodedToken=await jwt.verify(token,JWT_SECRET)
    

    if(decodedToken){
        const userId=(decodedToken as JwtPayload).id as string;
        
        (req as newReq).userId=userId;
        
        
        next()
    }
    else{
        res.status(404).json({message:"unauthorized access"})
    }

}