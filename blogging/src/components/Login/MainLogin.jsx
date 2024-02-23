import React, { useState, useContext, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { ContextData } from "../context/ContextData";
import Styles from "./Mainlanding.module.css";
import { useNavigate } from "react-router-dom";

function MainLogin() {
  const { login,token } = useContext(ContextData);
  const navigate = useNavigate();
  
  return (
    <div  className={`p-5 ${Styles.main}`}>
      <div className="flex-fill">
        <h4>Welcome Writers To</h4>
        <h1 className={Styles.title} >BLOGGERS</h1>
      </div>
      <div className='flex-fill'>{login ? <Login /> : <Register />}</div>
    </div>
  );
}

export default MainLogin;
