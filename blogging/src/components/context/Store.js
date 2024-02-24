import React, { useEffect, useState } from "react";
import { ContextData } from "./ContextData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {  validateForm } from "../CountomHook&Function";
import Swal from "sweetalert2";

function Store({ children }) {
  const [uName, setuName] = useState("XYZ");
  const [token, settoken] = useState("");
  const [login, setlogin] = useState(false);
  const [wlc, setWlc] = useState(false);
  const [AllblogData, setAllblogData] = useState([]);
  const [idStore, setidStore] = useState()
  const [blogData, setblogData] = useState([]);
  const navigate = useNavigate();
  // Api Data
  const baseURL = "http://localhost:8080";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
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
  //New Blog Data
  const [newBlog, setnewBlog] = useState({
    title: "",
    desc: "",
  });

    // Testing State
    const [Deletemsg, setDeletemsg] = useState()
    const [Newstat, setNewstat] = useState()

  // Registration API Call
  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm(RegFormData)) {
      try {
        const data = RegFormData;
        const response = await axios.post(`${baseURL}/user/register`, data);
        console.log(response);
        if (response.status === 200) {
          settoken(response.data.token);
          setuName(response.data.username);
          setWlc(true);
          toast.success(response.data.message);
          navigate("/home");
        }
      } catch (error) {
        if (
          (error.response && error.response.status >= 400) ||
          error.response.status <= 500
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`,
          });
        } else {
          alert("An error occurred:", error.response.data.message);
        }
      }
    }
  };

  // Login API Call
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        uName: LoginFormData.uName,
        password: LoginFormData.password,
      };
      const response = await axios.post(`${baseURL}/user/login`, data);
      if (response.status === 200) {
        settoken(response.data.token);
        setuName(response.data.username);
        setWlc(true);
        toast.success(response.data.message);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // All Blogs API Call
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseURL}/blog/allblog`, {
          headers,
        });
        // console.log(response);
        if (response.status === 200) {
          setAllblogData(response.data);
        }
        console.log("All Blogs:" + AllblogData);
      } catch (error) {
        if (
          (error.response && error.response.status >= 400) ||
          error.response.status <= 500
        ) {
          // console.log(error)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`,
          });
          navigate("/login");
          // alert("An error occurred:", error.response.data.message);
        } else {
          alert("An error occurred:", error.response.data.message);
        }
      }
    }
    fetchData();
  }, [token,Deletemsg,Newstat]);

  // Create New Blog API
  const handleNewBlog = async (e) => {
    e.preventDefault();

    try {
      const data = { title: newBlog.title, desc: newBlog.desc, uName: uName };
      console.log(data);
      const response = await axios.post(
        `${baseURL}/blog/newblog`, data,
        { headers }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setNewstat(response.data)
        setnewBlog({
          title: "",
          desc: "",
        })
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete Blog
  const handleDelete = async () => {
    
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      
      const data = { _id:idStore };
      console.log(data)
      const response = await axios.delete(
        `${baseURL}/blog/delBlog`,
        { 
          headers: headers,
          data: data
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setDeletemsg(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // My Blogs API call
  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${baseURL}/blog/Myblog`, { headers });
        // console.log(response);
        if (response.status === 200) {
         setblogData(response.data);
        }
        console.log("MyBblog: " + blogData);
      } catch (error) {
        if (
          (error.response && error.response.status >= 400) ||
          error.response.status <= 500
        ) {
          // console.log(error)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`,
          });
          navigate('/login')
          // alert("An error occurred:", error.response.data.message);
        } else {
          alert("An error occurred:", error.response.data.message);
        }
      }
    }
    fetchData();
  }, [token,Deletemsg,Newstat]);
  return (
    <ContextData.Provider
      value={{
        uName,
        newBlog,
        handleNewBlog,
        setnewBlog,
        AllblogData,
        RegFormData,
        handleRegister,
        setRegFormData,
        LoginFormData,
        handleLogin,
        setLoginFormData,
        setuName,
        token,
        settoken,
        login,
        setlogin,
        wlc,
        setWlc,
        idStore, setidStore,handleDelete,blogData, setblogData
      }}
    >
      {children}
    </ContextData.Provider>
  );
}

export default Store;
