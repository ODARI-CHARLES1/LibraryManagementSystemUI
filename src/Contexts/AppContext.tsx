import { createContext } from "react";
export interface appInterface{
    collapse:boolean,
    sideActive:number,
    selectActive:boolean,
    period:string,
    isAuthenticated: boolean,
    profilePop:boolean,
    theme: 'light' | 'dark',
    mobileMenuOpen: boolean,
    setPeriod:(period:string)=>void,
    setSelectActive:(q:boolean)=>void,
    setSideActive:(q:number)=>void,
    setCollapse:(prev:boolean)=>void,
    setIsAuthenticated: (auth: boolean) => void,
    setTheme: (theme: 'light' | 'dark') => void,
    setMobileMenuOpen: (open: boolean) => void,
    setProfilePop:(pop:boolean)=>void
}
const appContext=createContext<appInterface>({
    collapse:false,
    selectActive:false,
    profilePop:false,
    period:JSON.stringify(localStorage.getItem("period")),
    isAuthenticated: !!localStorage.getItem("currentUser"),
    theme: (localStorage.getItem("theme") as 'light' | 'dark') || 'light',
    mobileMenuOpen: false,
    setProfilePop:()=>{},
    setPeriod:()=>{},
    setSelectActive:()=>{},
    sideActive:Number(localStorage.getItem("sideActive")),
    setCollapse:()=>{},
    setSideActive:()=>{},
    setIsAuthenticated:()=>{},
    setTheme:()=>{},
    setMobileMenuOpen:()=>{}

})

export default appContext
