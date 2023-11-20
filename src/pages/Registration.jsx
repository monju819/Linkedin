import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, set, push } from "firebase/database";
const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  let navigate = useNavigate();
  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [load, setLoad] = useState(false);

  const [formdata, setFormdata] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleRegChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "fullname") {
      setFullnameError("");
    }
    if (e.target.name == "email") {
      setEmailError("");
    }
    if (e.target.name == "password") {
      setPasswordError("");
    }
  };

  const handleRegistration = () => {
    if (!formdata.fullname) {
      setFullnameError("Fullname requred");
    }
    if (!formdata.email) {
      setEmailError("Email requred");
    }
    if (!formdata.password) {
      setPasswordError("password requred");
    }

    if (formdata.fullname && formdata.email && formdata.email) {
      setLoad(true);
      createUserWithEmailAndPassword(auth, formdata.email, formdata.password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: formdata.fullname,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/linkedin-e48ce.appspot.com/o/download.jfif?alt=media&token=64cfdd54-1e01-4e0d-99f3-d60a63c894fa&_gl=1*1qo7jts*_ga*NTcyNDA4NjAzLjE2OTYyMzA4NDE.*_ga_CW55HF8NVT*MTY5ODU4MDcwNS41Ny4xLjE2OTg1ODIxNzkuMi4wLjA.",
          }).then(() => {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                setFormdata({
                  fullname: "",
                  email: "",
                  password: "",
                });
                setLoad(false);
                toast("Registration successful please verify your email!");
              })
              .then(() => {
                console.log(user.user.uid);
                set(ref(db, "users/" + user.user.uid), {
                  username: formdata.fullname,
                  email: formdata.email,
                  profile_picture:
                    "https://firebasestorage.googleapis.com/v0/b/linkedin-e48ce.appspot.com/o/download.jfif?alt=media&token=64cfdd54-1e01-4e0d-99f3-d60a63c894fa&_gl=1*1qo7jts*_ga*NTcyNDA4NjAzLjE2OTYyMzA4NDE.*_ga_CW55HF8NVT*MTY5ODU4MDcwNS41Ny4xLjE2OTg1ODIxNzkuMi4wLjA.",
                });
              });
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          });
        })

        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("email")) {
            toast("Email already in use");
          }

          setLoad(false);
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
            value={formdata.fullname}
            onChange={handleRegChange}
            name="fullname"
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            type={"email"}
            margin="normal"
            sx={{ width: "497px" }}
          />
          {fullnameError && (
            <Alert sx={{ width: "497px" }} severity="error">
              {" "}
              {fullnameError}{" "}
            </Alert>
          )}
          <TextField
            value={formdata.email}
            onChange={handleRegChange}
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
              {" "}
              {emailError}{" "}
            </Alert>
          )}
          <TextField
            value={formdata.password}
            onChange={handleRegChange}
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
              {" "}
              {passwordError}{" "}
            </Alert>
          )}

          {load ? (
            <Button
              endIcon={<HowToRegOutlinedIcon />}
              sx={{ marginTop: 3, borderRadius: 3, padding: 1.5 }}
              variant="contained"
              color="primary"
              disabled
            >
              <Oval
                height={25}
                width={60}
                color="#086FA4"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#086FA4"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </Button>
          ) : (
            <Button
              onClick={handleRegistration}
              endIcon={<HowToRegOutlinedIcon />}
              sx={{ marginTop: 3, borderRadius: 3, padding: 1.5 }}
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          )}

          <Link to="login">
            <Button
              sx={{
                marginTop: 3,
                borderRadius: 3,
                padding: 1.5,
                textTransform: "capitalize",
              }}
            >
              change to signIn
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Registration;
