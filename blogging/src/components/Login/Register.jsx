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
  const { handleRegister,RegFormData, setRegFormData } = useContext(ContextData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegFormData((prevState) => ({ ...prevState, [name]: value }));
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
          value={RegFormData.uName}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          margin="normal"
          required
          name="password"
          fullWidth
          value={RegFormData.password}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          margin="normal"
          required
          fullWidth
          name="email"
          value={RegFormData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          type="number"
          margin="normal"
          required
          name="Contact"
          fullWidth
          value={RegFormData.Contact}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
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
