import "./App.css";
import MainLogin from "./components/Login/MainLogin";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyBlogs from "./components/MyBlogs";
import { ContextData } from "./components/context/ContextData";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { wlc,login,token } = useContext(ContextData);
  console.log("Value of wlc:", wlc);
  console.log("Value of login:", login);
  
  
  return (
    <>
        <Toaster/>
        {wlc?<Navbar />:null}
        <Routes>
          <Route path="/" element={<MainLogin />} />
          <Route path="/login" element={<MainLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/MyBlogs" element={<MyBlogs />} />
        </Routes>
        </>
   
  );
}

export default App;
