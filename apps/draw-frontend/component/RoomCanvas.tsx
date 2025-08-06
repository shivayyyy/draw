"use client"
import { useRef ,useEffect, useState} from "react"

import { IconButton } from "./icon"
import { ArrowDownRight, Circle, Pencil, RectangleHorizontalIcon } from "lucide-react"



import { drawClass } from "./draw/drawClass"


export type tool="pencil"|"line"| "rect"| "circle"|null;


export  function RoomCanvas({roomId,ws}:{roomId:number,ws:WebSocket}) {
    const [selectedTool,setSelectedTool]=useState<tool>(null)
    const [newDrawClass,setNewDrawClass]=useState<drawClass>()
  

    
    const canvasRef=useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        newDrawClass?.setTool(selectedTool)
    },[selectedTool,newDrawClass])
     useEffect(()=>{
           
            if(canvasRef.current){
                const newDraw=new drawClass(canvasRef.current,roomId,ws)
                
                setNewDrawClass(newDraw)
            }
        },[canvasRef])

        return (
            <div className="h-full w-full overflow-hidden">
                <canvas height={window.innerHeight} width={window.innerWidth} ref={canvasRef}></canvas>
                <NavBarTools selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
            </div>
        )
    
}


function NavBarTools({selectedTool,setSelectedTool}:{selectedTool:tool,setSelectedTool:(tool:tool)=>void}){
    
    return <div className="gap-2 fixed top-8 flex items-center justify-between left-10">
        <IconButton activated={selectedTool==="pencil"} icon={<Pencil/>} onClick={()=>{
            setSelectedTool("pencil")
            console.log(selectedTool)
            
        }}/>
        <IconButton activated={selectedTool==="rect"} icon={<RectangleHorizontalIcon/>} onClick={()=>{
            setSelectedTool("rect")
            console.log(selectedTool)
            
        }}/>
        <IconButton activated={selectedTool==="circle"} icon={<Circle/>} onClick={()=>{
            setSelectedTool("circle")
            console.log(selectedTool)
            
        }}/>
        <IconButton activated={selectedTool==="line"} icon={<ArrowDownRight/>} onClick={()=>{
            setSelectedTool("line")
            console.log(selectedTool)
            
        }}/>

    </div>
}


