import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { activeUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LogIn = () => {
  const auth = getAuth();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let data = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    if (data) {
      navigate("/home");
    }
  });

  const handleloginChange = (e) => {
    setLogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });

    setEmailError("");
    setPasswordError("");
  };

  const handlelogin = () => {
    if (logindata.email && logindata.password) {
      signInWithEmailAndPassword(
        auth,
        logindata.email,
        logindata.password
      ).then((user) => {
        // console.log(user.user);
        navigate("/home");
        dispatch(activeUser(user.user));
        localStorage.setItem("user", JSON.stringify(user.user));
      });
    }
  };

  return (
    <div>
      <form action="">
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={"797px"}
          alignItems={"center"}
          justifyContent={"center"}
          margin="auto"
          marginTop={"140px"}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <LinkedInIcon
            color="primary"
            sx={{ width: "46px", height: "46px" }}
          />
          <Typography fontSize={"34.4px"}>
            Get started with easily register
          </Typography>
          <Typography fontSize={"20.64px"}>
            Free register and you can enjoy it
          </Typography>
          <TextField
            onChange={handleloginChange}
            name="email"
            id="outlined-basic"
            label="Email Addres"
            variant="outlined"
            type={"text"}
            margin="normal"
            sx={{ width: "497px" }}
          />
          {emailError && (
            <Alert sx={{ width: "497px" }} severity="error">
              {emailError}
            </Alert>
          )}
          <TextField
            onChange={handleloginChange}
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={"password"}
            margin="normal"
            sx={{ width: "497px" }}
          />

          {passwordError && (
            <Alert sx={{ width: "497px" }} severity="error">
              {passwordError}
            </Alert>
          )}
          <Button
            onClick={handlelogin}
            endIcon={<LoginOutlinedIcon />}
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Link to="/">
            <Button
              sx={{
                marginTop: 3,
                borderRadius: 3,
                padding: 1.5,
                textTransform: "capitalize",
              }}
            >
              change to signup
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default LogIn;
