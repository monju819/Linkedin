import React from "react";
import Grid from "@mui/material/Grid";
import Userlist from "./Userlist";
import FriendRequest from "./FriendRequest";
import Friend from "./Friend";
import Grouplist from "./Grouplist";
import Mygroup from "./Mygroup";
const Post = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grouplist />
          <Mygroup />
        </Grid>
        <Grid item xs={6}>
          <div className="sidebar__feed__left">ghuhiofvoip</div>
        </Grid>
        <Grid item xs={3}>
          <Userlist />
          <FriendRequest />
          <Friend />
        </Grid>
      </Grid>
    </>
  );
};

export default Post;
