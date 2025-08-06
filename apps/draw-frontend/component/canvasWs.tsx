"use client"
import { useRef,useEffect, useState } from "react";

import { WS_URL } from "@/config";
import { RoomCanvas } from "./RoomCanvas";

export  function CanvasWs({roomId}:{roomId:number}){
    
    const [socket,setSocket]=useState<WebSocket | null>(null); 
    const canvasRef=useRef<HTMLCanvasElement>(null);
     // "token=xyz; other=value"

        

    useEffect(()=>{
        const token=document.cookie.split("=")[1]
        console.log(token)
        
        

        const ws=new WebSocket(`ws://localhost:8081?token=${token}`)

        ws.onopen=()=>{
            setSocket(ws)
            ws.send(JSON.stringify({
                type:"join",
                roomId,
                 
            }))
        }
    },[canvasRef])

    if(!socket){
        return <div>
            connecting to ws-server
        </div>
    }
    return <div>
        <RoomCanvas roomId={roomId} ws={socket}/>
    </div>

    
}