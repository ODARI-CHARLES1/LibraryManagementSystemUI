import { createContext } from "react";
export interface appInterface{
    collapse:boolean,
    sideActive:number,
    selectActive:boolean,
    period:string,
    setPeriod:(period:string)=>void,
    setSelectActive:(q:boolean)=>void,
    setSideActive:(q:number)=>void,
    setCollapse:(prev:boolean)=>void
}
const appContext=createContext<appInterface>({
    collapse:false,
    selectActive:false,
    period:JSON.stringify(localStorage.getItem("period")),
    setPeriod:()=>{},
    setSelectActive:()=>{},
    sideActive:Number(localStorage.getItem("sideActive")),
    setCollapse:()=>{},
    setSideActive:()=>{},

})

export default appContext
