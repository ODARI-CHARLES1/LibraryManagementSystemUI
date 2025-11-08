import appContext from "./AppContext";
import { useState,} from 'react'
import type {FC,ReactNode} from 'react'


interface appProviderProp{
    children:ReactNode
}
export const AppProvider:FC<appProviderProp>=({children})=>{
    const [collapse,setCollapse]=useState(false)
    const value={
        collapse,
        setCollapse
    }
    return(
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}
