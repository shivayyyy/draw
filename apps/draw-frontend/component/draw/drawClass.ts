import { getShapesFromDb } from "./http";
import { tool } from "../RoomCanvas";

type Shape={
    type:"rect",
    x:number,
    y:number,
    height:number,
    width:number,
}
 | {
    type:"circle",
    centerX:number,
    centerY:number,
    radius:number,
} | {
    type:"line",
    startX:number,
    endX:number,
    startY:number,
    endY:number,
    
} ;



export class drawClass{

    private canvas:HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private existingShape:Shape[]
    private roomId:number
    private socket:WebSocket
    private clicked:boolean
    private startX:number
    private startY:number
    private endX:number
    private endY:number
    private slectedTool:tool=null



    constructor(canvas:HTMLCanvasElement,roomId:number,socket:WebSocket){
        this.canvas=canvas
        this.ctx=canvas.getContext("2d")!
        this.roomId=roomId
        this.clicked=false
        this.startX=0
        this.startY=0
        this.endX=0
        this.endY=0
        this.socket=socket
        this.existingShape=[]
        
        this.init()
        
        this.initHandlers()
        this.initMouseHandlers()
    }
    

    setTool(tool:tool){
        this.slectedTool=tool;
    }

    async init(){
        this.existingShape=await getShapesFromDb(this.roomId)
        console.log(this.existingShape)
        this.clearCanvas()
    }
     clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.fillStyle='rgba(18,19,19,1)'
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

        this.existingShape.map((shape)=>{
            if(shape.type==="rect"){
                this.ctx.strokeStyle='rgba(255,255,255,1)'
                this.ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
            }
            if(shape.type==="circle"){
                this.ctx.beginPath()
                this.ctx.arc(shape.centerX,shape.centerY,shape.radius,0,Math.PI*2)
                this.ctx.strokeStyle = 'rgba(255,255,255,1)';

                this.ctx.stroke();
                this.ctx.closePath();
            }
            if(shape.type==="line"){
                const dx = shape.endX - shape.startX;
                    const dy = shape.endY - shape.startY;

                    const angle = Math.atan2(shape.endY - shape.startY, shape.endX - shape.startX);
                    const lineLength = Math.sqrt(dx * dx + dy * dy);
                    //draw main line
                    this.ctx.strokeStyle = "white";
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.startX, shape.startY);
                    this.ctx.lineTo(shape.endX, shape.endY);
                    this.ctx.stroke();

                    //draw arrow head
                    const arrowLength = lineLength * 0.1;
                    const angleOffset = Math.PI / 6; // 30 degrees in radians

                    // Left wing of arrowhead
                    const leftX = shape.endX - arrowLength * Math.cos(angle - angleOffset);
                    const leftY = shape.endY - arrowLength * Math.sin(angle - angleOffset);

                    // Right wing of arrowhead
                    const rightX = shape.endX - arrowLength * Math.cos(angle + angleOffset);
                    const rightY = shape.endY - arrowLength * Math.sin(angle + angleOffset);

                    // Draw left line
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.endX, shape.endY);
                    this.ctx.lineTo(leftX, leftY);
                    this.ctx.stroke();

// Draw right line
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.endX, shape.endY);
                    this.ctx.lineTo(rightX, rightY);
                    this.ctx.stroke();
            }
        })
    }
    initHandlers(){
        this.socket.onmessage=(ev)=>{
            const message=JSON.parse(ev.data);
            if(message.type==="chat"){
                const parsedShape=JSON.parse(message.message)
                this.existingShape.push(parsedShape.shape)
                this.clearCanvas()
            }
        }
    }


    initMouseHandlers(){
        this.canvas.addEventListener("mousedown", (e)=>{
            this.clicked=true;
            this.startX=e.clientX;
            this.startY=e.clientY;
        })

        this.canvas.addEventListener("mouseup",(e)=>{
            this.clicked=false
            let shape:Shape|null=null;
            const width=e.clientX-this.startX
            const height=e.clientY-this.startY
            this.endX=e.clientX;
            this.endY=e.clientY;

            if(this.slectedTool==="rect"){
                shape={
                    type:"rect",
                    x:this.startX,
                    y:this.startY,
                    width:width,
                    height:height
                }
            }
            if(this.slectedTool==="circle"){
                const radius=Math.abs(Math.max(height,width)/2)
                shape={
                    type:"circle",
                    radius,
                    centerX:this.startX+radius,
                    centerY:this.startY+radius,
                    
                }
            }
            if(this.slectedTool==="line"){
                
                shape={
                    type:"line",
                    startX:this.startX,
                    startY:this.startY,
                    endX:this.endX,
                    endY:this.endY,
                    
                }
            }
            if(!shape)return;

            this.existingShape.push(shape);
            

            this.socket.send(JSON.stringify({
                type:"chat",
                message:JSON.stringify({shape}),
                roomId:this.roomId
            }))
        })

        this.canvas.addEventListener("mousemove",(e)=>{
            if(this.clicked){
                const width=e.clientX-this.startX
                const height=e.clientY-this.startY
                const endX=e.clientX;
                const endY=e.clientY;
                this.clearCanvas()
                this.ctx.strokeStyle='rgb(255,255,255)'

                if(this.slectedTool==="rect"){
                    this.ctx.strokeRect(this.startX,this.startY,width,height)
                }else if(this.slectedTool==="circle"){
                    const radius=Math.abs(Math.max(height,width)/2)
                    const centerX=this.startX+radius
                    const centerY=this.startY+radius
                    this.ctx.beginPath()
                    this.ctx.arc(centerX,centerY,radius,0,Math.PI*2)
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
                else if(this.slectedTool==="line"){
                    const dx = endX - this.startX;
                    const dy = endY - this.startY;

                    const angle = Math.atan2(endY - this.startY, endX - this.startX);
                    const lineLength = Math.sqrt(dx * dx + dy * dy);
                    //draw main line
                    this.ctx.strokeStyle = "white";
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.startX, this.startY);
                    this.ctx.lineTo(endX, endY);
                    this.ctx.stroke();

                    //draw arrow head
                    const arrowLength = lineLength * 0.1;
                    const angleOffset = Math.PI / 6; // 30 degrees in radians

                    // Left wing of arrowhead
                    const leftX = endX - arrowLength * Math.cos(angle - angleOffset);
                    const leftY = endY - arrowLength * Math.sin(angle - angleOffset);

                    // Right wing of arrowhead
                    const rightX = endX - arrowLength * Math.cos(angle + angleOffset);
                    const rightY = endY - arrowLength * Math.sin(angle + angleOffset);

                    // Draw left line
                    this.ctx.beginPath();
                    this.ctx.moveTo(endX, endY);
                    this.ctx.lineTo(leftX, leftY);
                    this.ctx.stroke();

// Draw right line
                    this.ctx.beginPath();
                    this.ctx.moveTo(endX, endY);
                    this.ctx.lineTo(rightX, rightY);
                    this.ctx.stroke();
                }
            }
        })
    }


}