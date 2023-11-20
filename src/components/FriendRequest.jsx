import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  let [requestlist, setRequestlist] = useState([]);
  const db = getDatabase();
  let userInfo = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    const friendreqRef = ref(db, "friendRequest");
    onValue(friendreqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid == userInfo.uid) {
          // firebase push diye jai id ta create korsi oiid ta akhane dorte hobe item.val() er sathe
          arr.push({ ...item.val(), frid: item.key });
        }
      });
      setRequestlist(arr);
    });
  }, []);

  let handleFrqDelete = (item) => {
    // frid take remove korle delete hoye jave
    // console.log(item.frid);
    remove(ref(db, "friendRequest/" + item.frid));
  };

  let handleAcceft = (item) => {
    console.log(item);

    set(push(ref(db, "friends")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.frid));
    });
  };

  return (
    <div className="box">
      <h3>FriendRequest</h3>
      {requestlist.map((item) => (
        <div className="list">
          <img src={userInfo.photoURL} alt="" />
          <h5> {item.sendername} </h5>
          <Button variant="contained" onClick={() => handleAcceft(item)}>
            A
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleFrqDelete(item)}
          >
            D
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
