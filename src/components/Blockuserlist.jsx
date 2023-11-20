import React, { useEffect, useState } from "react";

import pf from "../assets/profile.png";
import { Button } from "@mui/material";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
const Blockuserlist = () => {
  let [blocklist, setBlocklist] = useState([]);
  const db = getDatabase();
  let userInfo = useSelector((state) => state.activeUser.value);
  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), bid: item.key });
      });
      setBlocklist(arr);
    });
  }, []);

  let handleunblock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: item.blockname,
      senderid: item.blockid,
      receivername: item.blockbyname,
      receiverid: item.blockbyid,
    }).then(() => {
      remove(ref(db, "block/" + item.bid));
    });
  };

  return (
    <div className="box">
      <h3>Block User List</h3>
      {blocklist.map((item) => (
        <div className="list">
          <img src={pf} alt="" />
          <h5>
            {item.blockbyid == userInfo.uid ? item.blockname : item.blockbyname}
          </h5>
          {item.blockbyid == userInfo.uid && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleunblock(item)}
            >
              unblock
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blockuserlist;
