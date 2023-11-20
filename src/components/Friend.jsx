import React, { useEffect, useState } from "react";
import pf from "../assets/profile.png";
import { Button } from "@mui/material";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
const Friend = () => {
  let [friend, setFriend] = useState([]);

  const db = getDatabase();
  let userInfo = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    const friendtRef = ref(db, "friends");
    onValue(friendtRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log("ami friend", item.val());
        if (
          item.val().senderid == userInfo.uid ||
          item.val().receiverid == userInfo.uid
        ) {
          arr.push({ ...item.val(), fid: item.key });
        }
      });
      setFriend(arr);
    });
  }, []);

  // friend request acceft korar por user jate block korte pare ai block user logic ta milabo aikhane

  let handleblock = (item) => {
    if (userInfo.uid == item.senderid) {
      set(push(ref(db, "block")), {
        blockname: item.receivername,
        blockid: item.receiverid,
        blockbyname: item.sendername,
        blockbyid: item.senderid,
      }).then(() => {
        remove(ref(db, "friends/" + item.fid));
      });
    } else {
      set(push(ref(db, "block")), {
        blockname: item.sendername,
        blockid: item.senderid,
        blockbyname: item.receivername,
        blockbyid: item.receiverid,
      }).then(() => {
        remove(ref(db, "friends/" + item.fid));
      });
    }
  };

  return (
    <div className="box">
      <h3>Friend</h3>

      {friend.map((item) => (
        <div className="list">
          <img src={pf} alt="" />
          <h5>
            {item.senderid == userInfo.uid
              ? item.receivername
              : item.sendername}
          </h5>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleblock(item)}
          >
            Block
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Friend;
