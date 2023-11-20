import React, { useEffect, useState } from "react";
import pf from "../assets/profile.png";
import { Button } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const Mygroup = () => {
  let [grouplist, setGrouplist] = useState([]);
  const db = getDatabase();
  let userInfo = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    const groupRef = ref(db, "group");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log(item);
        if (item.val().adminid == userInfo.uid) {
          arr.push(item.val());
        }
      });
      setGrouplist(arr);
    });
  }, []);

  return (
    <div className="box">
      <h3>MyGroup</h3>
      {grouplist.map((item) => (
        <div className="list">
          <img src={pf} alt="" />
          <h5> {item.groupName} </h5>
          <Button variant="contained">rl</Button>
          <Button variant="contained">ml</Button>
        </div>
      ))}
    </div>
  );
};

export default Mygroup;
