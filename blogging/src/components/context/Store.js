import React, {useEffect, useState} from 'react'
import { ContextData } from './ContextData'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import {useApiCallPost} from '../CountomHook&Function'


function Store({children}) {
  const [uName, setuName] = useState('XYZ')
  const [token, settoken] = useState('')
  const [login, setlogin] = useState(false)
  const [wlc, setWlc] = useState(false)
  const navigate = useNavigate()
  const baseURL = 'http://localhost:8080';
  //  Registration Form Data
  const [RegFormData, setRegFormData] = useState({
    uName: "",
    password: "",
    email: "",
    Contact: "",
  });
  // Login Form Data
    const [LoginFormData, setLoginFormData] = useState({
      uName: "",
      password: "",
    });
    
    // Registration API Call
    
    // Login API Call
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const data = { uName: LoginFormData.uName, password:LoginFormData.password }
      const response = await axios.post(`${baseURL}/user/login`, data);
      if (response.status === 200){
        settoken( response.data.token)
        setuName( response.data.username)
        setWlc(true);
        toast.success(response.data.message)
        navigate('/home')
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
    
  return (
    <ContextData.Provider value={{uName,RegFormData, setRegFormData,LoginFormData,handleLogin, setLoginFormData, setuName, token, settoken,login, setlogin,wlc, setWlc}}>
        {children}
    </ContextData.Provider>
  )
}

export default Store