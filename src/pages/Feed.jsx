import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Mygroup from "../components/Mygroup";
import Grouplist from "../components/Grouplist";
import Userlist from "../components/Userlist";
import FriendRequest from "../components/FriendRequest";
import Friend from "../components/Friend";
import Blockuserlist from "../components/Blockuserlist";
const Feed = () => {
  let navigate = useNavigate();
  let data = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Mygroup />
        <Grouplist />
        <Blockuserlist />
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={3}>
        <Userlist />
        <FriendRequest />
        <Friend />
      </Grid>
    </Grid>
  );
};

export default Feed;
