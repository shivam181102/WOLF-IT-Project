import React, {useEffect, useState} from 'react'
import { ContextData } from './ContextData'
import { Navigate } from "react-router-dom";
function Store({children}) {
    
   
    const [uName, setuName] = useState('XYZ')
    const [token, settoken] = useState('')
    const [login, setlogin] = useState(false)
    const [wlc, setWlc] = useState(false)
  
  
    
  return (
    <ContextData.Provider value={{uName, setuName, token, settoken,login, setlogin,wlc, setWlc}}>
        {children}
    </ContextData.Provider>
  )
}

export default Store