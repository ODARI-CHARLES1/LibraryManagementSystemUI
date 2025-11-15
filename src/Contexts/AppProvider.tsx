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
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("currentUser"))
    const [theme, setTheme] = useState<'light' | 'dark'>((localStorage.getItem("theme") as 'light' | 'dark') || 'light')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profilePop,setProfilePop]=useState(false)


    const value={
        profilePop,
        collapse,
        period,
        sideActive,
        selectActive,
        isAuthenticated,
        theme,
        mobileMenuOpen,
        setProfilePop,
        setPeriod,
        setSelectActive,
        setSideActive,
        setCollapse,
        setIsAuthenticated,
        setTheme,
        setMobileMenuOpen
    }
    return(
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}
