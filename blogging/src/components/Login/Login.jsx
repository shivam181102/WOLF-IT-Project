// src/Login.js
import React, { useContext, useState } from "react";
// import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ContextData } from "../context/ContextData";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import { useHistory } from "react-router-dom";
const Login = ({ history }) => {
  const [LocalUser, setLocalUser] = useState("");
  const [Localpass, setLocalpass] = useState("");
  const {  setlogin, setWlc, setuName, settoken } = useContext(ContextData);
  // const history = useHistory();
  const navigate = useNavigate()
  const baseURL = 'http://localhost:8080/user';
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const data = { uName: LocalUser, password:Localpass }
      const response = await axios.post(`${baseURL}/login`, data);
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
          value={LocalUser}
          onChange={(e) => setLocalUser(e.target.value)}
        />
        <TextField
          label="Password"
          type="Password"
          margin="normal"
          fullWidth
          value={Localpass}
          onChange={(e) => setLocalpass(e.target.value)}
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
