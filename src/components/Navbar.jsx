import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../slices/userSlice";
import { Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  let dispatch = useDispatch();
  const auth = getAuth();
  let navigate = useNavigate();
  let data = useSelector((state) => state.activeUser.value);

  let handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
      dispatch(activeUser(null));
      localStorage.removeItem("user");
    });
  };
  return (
    <div className="navbar">
      <div>Logo</div>
      <div className="nav__img">
        <img src={data.photoURL} alt="" />

        <p>{data.displayName}</p>
      </div>
      <NavLink to="/home" activeClassName="active-link">
        {" "}
        {/* Use NavLink */}
        <Button
          sx={{
            marginTop: 3,
            borderRadius: 3,
            padding: 1.5,
            textTransform: "capitalize",
          }}
        >
          Home
        </Button>
      </NavLink>
      <NavLink to="/profile" activeClassName="active-link">
        {" "}
        {/* Use NavLink */}
        <Button
          sx={{
            marginTop: 3,
            borderRadius: 3,
            padding: 1.5,
            textTransform: "capitalize",
          }}
        >
          Profile
        </Button>
      </NavLink>
      <Button variant="contained" onClick={handleLogout}>
        logout
      </Button>
    </div>
  );
};

export default Navbar;
