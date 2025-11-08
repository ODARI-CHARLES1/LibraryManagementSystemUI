import { createContext } from "react";
export interface appInterface{
    collapse:boolean,
    setCollapse:(prev:boolean)=>void
}
const appContext=createContext<appInterface>({
    collapse:false,
    setCollapse:()=>{}
})

export default appContext
