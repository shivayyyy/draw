import axios from "axios";
import { HTTP_BACKEND } from "@/config";

export async function  getShapesFromDb (roomId:number){
    const res=await axios.get(`${HTTP_BACKEND}/chat/${roomId}`,{withCredentials:true})
    const logs=res.data.getChatLogs;
    

 
 const shapes=logs.map((x:{message:string})=>{
    const mesData=JSON.parse(x.message)
    return mesData.shape;
 })
return shapes;
}