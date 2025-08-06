import {create} from "zustand"
import axios from "axios"
import { HTTP_BACKEND } from "@/config"
import { useEffect } from "react"





export type Shape={
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
}   | null;

export type tool="rect" |"circle"|"line" | null;

interface shapeStore{
    
    shapesData:Shape[];
    loading:boolean,
    selectedTool:tool | null;
    fetchShapes:(roomId:number)=>Promise<void>
    error:string | null;
    selectTool:(tool:tool | null)=>void
   
}

export const useShapeStore= create<shapeStore>((set)=>({
  shapesData: [],
  selectedTool: null,
  loading: false,
  error: null,

  fetchShapes: async (roomId: number) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${HTTP_BACKEND}/shapes/${roomId}`, {
        withCredentials: true,
      });

      set({ shapesData: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  

  selectTool: (tool: tool | null) => {
    set({ selectedTool: tool });
  },
}))