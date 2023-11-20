import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const Userlist = () => {
  const db = getDatabase();
  let [userslist, setUserslist] = useState([]);
  let [requestlist, setRequestlist] = useState([]);
  let [friend, setFriend] = useState([]);
  let [blocklist, setBlocklist] = useState([]);
  let userInfo = useSelector((state) => state.activeUser.value);
  // firebase read and write web doc er read data theke user singn up er por jai data firebase joma hoise oikhan theke read datar maddome user er data ta anlm r jeheto data ta amr load er sathe sathe lagbe tai useEfect lagbe

  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userInfo.uid != item.key) {
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setUserslist(arr);
    });
  }, []);

  // send friend request

  let handleFriendRequest = (info) => {
    // console.log(info);
    // const requestKey = info.userid + userInfo.uid;

    // // Check if a friend request already exists
    // if (requestlist.includes(requestKey)) {
    //   // If it exists, delete the request
    //   const requestIndex = requestlist.indexOf(requestKey);
    //   const updatedRequestList = [...requestlist];
    //   updatedRequestList.splice(requestIndex, 1);
    //   setRequestlist(updatedRequestList);
    // } else {
    //   // If it doesn't exist, send a friend request
    //   set(push(ref(db, "friendRequest")), {
    //     sendername: userInfo.displayName,
    //     senderid: userInfo.uid,
    //     receivername: info.username,
    //     receiverid: info.userid,
    //   });
    // }

    set(push(ref(db, "friendRequest")), {
      sendername: userInfo.displayName,
      senderid: userInfo.uid,
      receivername: info.username,
      receiverid: info.userid,
    });
  };

  // friend req components theke friendRequest er data ta niya aslam ja firebase theke read datar maddome ansilm .akhon user list aa req send er por panding button er jonno   friendRequest data ta abr userlist component a anlam

  useEffect(() => {
    const friendreqRef = ref(db, "friendRequest");
    onValue(friendreqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      });
      setRequestlist(arr);
    });
  }, []);

  // friend hoyar por user list aa panding button take chane kore friend button show korabo ai jonno friend component theke friend er data ta key niye aslam

  useEffect(() => {
    const friendtRef = ref(db, "friends");
    onValue(friendtRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      });
      setFriend(arr);
    });
  }, []);

  //  block hoyar por userlist er f button ta ke change kore b button korbo

  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockid + item.val().blockbyid);
      });
      setBlocklist(arr);
    });
  }, []);

  return (
    <>
      <div className="box">
        <h3>User List</h3>
        {userslist.map((item) => (
          <div className="list">
            <img src={userInfo.photoURL} alt="" />
            <h5> {item.username} </h5>

            {/* {requestlist.includes(item.userid + userInfo.uid) ||
requestlist.includes(userInfo.uid + item.userid) ? (
  <div>
    <Button variant="contained" color="warning" onClick={() => handleFriendRequest(item)}>
      Delete
    </Button>
  </div>
) : (
  <div>
    <Button variant="contained" onClick={() => handleFriendRequest(item)}>
      Add
    </Button>
  </div>
)} */}

            {requestlist.includes(item.userid + userInfo.uid) ||
            requestlist.includes(userInfo.uid + item.userid) ? (
              <Button variant="contained" color="warning">
                p
              </Button>
            ) : friend.includes(item.userid + userInfo.uid) ||
              friend.includes(userInfo.uid + item.userid) ? (
              <Button variant="contained">F</Button>
            ) : blocklist.includes(item.userid + userInfo.uid) ||
              blocklist.includes(userInfo.uid + item.userid) ? (
              <Button
                variant="contained"
                onClick={() => handleFriendRequest(item)}
              >
                b
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleFriendRequest(item)}
              >
                Add
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Userlist;
