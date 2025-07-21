import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"


export function getUser(req:Request,res:Response,next:NextFunction){

    const token=req.headers["authorization"]??"";

    const decodedToken=jwt.verify(token,JWT_SECRET)

    if(decodedToken){
        const userId=(decodedToken as JwtPayload).userId
        next()
    }
    else{
        res.status(404).json({message:"unauthorized access"})
    }

}