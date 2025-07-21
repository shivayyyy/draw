import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"

const wss=new WebSocketServer({port:8080})

wss.on("connection",function(ws,request){
    const url=request.url;  //http:localhost:3000?token=1348gdhd&name=shivam

    if(!url){
        return;
    }
    //url is a array of form ["http:localhost:3000","token=1348gdhd"]
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token')||"";

    const decode=jwt.verify(token,JWT_SECRET)
    if(typeof decode=="string"){
        ws.close();
        return
    }
    if(!decode || !(decode as JwtPayload).userId){
        ws.close();
        return;
    }

    ws.on("message",function(data){
        ws.send(`you sended : ${data}`)
    })


})