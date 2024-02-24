// src/Login.js
import React, { useContext } from "react";
// import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ContextData } from "../context/ContextData";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";


const Login = () => {
  const {  setlogin, setWlc, setuName, settoken,LoginFormData,handleLogin, setLoginFormData } = useContext(ContextData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  

  return (
    <Container component="main" maxWidth="lg" >
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
          value={LoginFormData.uName}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="Password"
          margin="normal"
          fullWidth
          name="password"
          value={LoginFormData.password}
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
          Sign In
        </Button>
        <Button
          fullWidth
          onClick={() => {
            setlogin(false);
          }}
          sx={{ marginTop: 2 }}
        >
          Register 
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
