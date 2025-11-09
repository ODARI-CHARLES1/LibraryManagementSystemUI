import appContext from "./AppContext";
import { useState,} from 'react'
import type {FC,ReactNode} from 'react'

interface appProviderProp{
    children:ReactNode
}
export const AppProvider:FC<appProviderProp>=({children})=>{
    const [collapse,setCollapse]=useState(false)
    const [sideActive,setSideActive]=useState(Number(localStorage.getItem("sideActive")))
    const [selectActive,setSelectActive]=useState(false)
    const [period,setPeriod]=useState(JSON.stringify(localStorage.getItem("Period")))

    const value={
        collapse,
        period,
        sideActive,
        selectActive,
        setPeriod,
        setSelectActive,
        setSideActive,
        setCollapse
    }
    return(
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}
