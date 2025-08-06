

import { CanvasWs } from "@/component/canvasWs";


export default async function Canvas({params}:{params:{
    roomId:string
}}){
    const roomId=(await params).roomId

    const intRoom=parseInt(roomId)

    
    
    console.log(typeof(roomId))

    return <CanvasWs roomId={intRoom}/>
} 