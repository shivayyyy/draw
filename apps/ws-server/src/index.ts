import WebSocket,{ WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"
import { prismaClient } from "@repo/database/client";


const wss=new WebSocketServer({port:8081})
interface User{
    ws:WebSocket,
    userId:string,
    rooms:string[]
}

const users:User[]=[];

function checkUserId(token:string):string| null{
    const decodedToken= jwt.verify(token,JWT_SECRET) as JwtPayload;
    if(decodedToken){
        const userId=decodedToken.id;
        return userId;
    }
    else{
        return null;
    }
 }

wss.on("connection",function(ws,request){
    const url=request.url;  //http:localhost:3000?token=1348gdhd&name=shivam

    if(!url){
        return;
    }
    //url is a array of form ["http:localhost:3000","token=1348gdhd"]
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token')||"";
    

    const userId=checkUserId(token);
   
    if(!userId ){
        ws.close();
        return;
    }


    //when users join
    users.push({
        userId,
        ws,
        rooms:[],
    })

    //when users join a room wss send a message

    ws.on("message",async function(data){
        const parsedData=JSON.parse(data as unknown as string)
        

        if(parsedData.type=="join"){
            const user=users.find(x=>x.ws===ws)
            user?.rooms.push(parsedData.roomId)
        }
        if(parsedData.type=="leave"){
            const user=users.find(x=>x.ws===ws)
            if(!user){
                return
            }
            user.rooms.filter(x=>x===parsedData.roomId)
        }
        if(parsedData.type=="chat"){
            const roomId=parsedData.roomId
            const message=parsedData.message

            const savedchat=await prismaClient.chat.create({
                data:{
                    message,
                    roomId,
                    userId,
                }
            })
            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId,
                    }))
                }
            })
            
            
        }
    })


})