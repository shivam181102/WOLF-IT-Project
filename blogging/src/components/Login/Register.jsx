// src/Login.js
import React, { useContext, useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ContextData } from "../context/ContextData";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { setlogin } = useContext(ContextData);
  const [FormData, setFormData] = useState({
    uName: "",
    password: "",
    email: "",
    Contact: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();
  const { setWlc, setuName, settoken } = useContext(ContextData);

  function validateForm() {
    if (FormData.uName.trim() === "") {
      toast.error("Username must not be empty");
      return false;
    }

    if (FormData.password.trim() === "") {
      toast.error("Password must not be empty");
      return false;
    }

    if (FormData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailPattern.test(FormData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (FormData.Contact === "") {
      toast.error("Contact must not be empty");
      return false;
    }

    // You can add more specific validation rules for the contact field if needed

    return true; // Form is valid
  }

  const baseURL = "http://localhost:8080/user";
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = FormData;
        const response = await axios.post(`${baseURL}/register`, data);
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
            icon: 'error',
            title: 'Oops...',
            text: `${error.response.data.message}`,
          });
        } else {
          alert("An error occurred:", error.response.data.message);
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: "large" }} />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Sign in
        </Typography>
        <TextField
          label="Username"
          margin="normal"
          fullWidth
          name="uName"
          required
          value={FormData.uName}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          margin="normal"
          required
          name="password"
          fullWidth
          value={FormData.password}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          margin="normal"
          required
          fullWidth
          name="email"
          value={FormData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          type="number"
          margin="normal"
          required
          name="Contact"
          fullWidth
          value={FormData.Contact}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{
            marginTop: 2,
            background: "-webkit-linear-gradient(#ff7e5f, #feb47b)",

            color: "white",
          }}
        >
          Register
        </Button>
        <Button
          fullWidth
          onClick={() => {
            setlogin(true);
          }}
          sx={{ marginTop: 2 }}
        >
          Log In
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
