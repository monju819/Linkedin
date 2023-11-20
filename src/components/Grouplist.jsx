import React, { useEffect, useState } from "react";
import pf from "../assets/profile.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
} from "firebase/database";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Grouplist = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  let [grouplist, setGrouplist] = useState([]);
  let [groupRtlist, setGroupRlist] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  let userInfo = useSelector((state) => state.activeUser.value);

  // grouplist er smae data ta ke akhane niye aslam just jodi condition na mile taile aikhane amr group sara onno all group show korbe

  useEffect(() => {
    const groupRef = ref(db, "group");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid != userInfo.uid) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGrouplist(arr);
    });
  }, []);

  // groupRequest er data gula firbase theke niye aslam Panding and cancel condition er jonno
  useEffect(() => {
    const groupRef = ref(db, "groupRequest");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().senderid == userInfo.uid) {
        }
        arr.push(item.val().senderid + item.val().gid);
      });
      setGroupRlist(arr);
    });
  }, []);

  let handleCreategroup = () => {
    // console.log(groupName, groupTag);
    set(push(ref(db, "group")), {
      groupName: groupName,
      groupTag: groupTag,
      adminname: userInfo.displayName,
      adminid: userInfo.uid,
    }).then(() => {
      setOpen(false);
    });
  };
  // database a group request er data pathalam
  let handlejoingroup = (item) => {
    console.log(item);
    set(push(ref(db, "groupRequest")), {
      ...item,
      senderid: userInfo.uid,
      sendername: userInfo.displayName,
    });
  };

  let handlecancel = (item) => {
    const groupRef = ref(db, "groupRequest");
    onValue(groupRef, (snapshot) => {
      // let did = "";
      snapshot.forEach((gitem) => {
        if (item.gid === gitem.val().gid) {
          // did = gitem.key;
          remove(ref(db, "groupRequest/" + gitem.key));
          return;
        }
      });
      // remove(ref(db, "groupRequest/" + did));
    });
  };

  return (
    <div className="box">
      <div className="group__header">
        <h3>Group List</h3>
        <Button variant="contained" onClick={handleOpen}>
          Create-Group
        </Button>
      </div>
      {grouplist.map((item) => (
        <div className="list">
          <img src={pf} alt="" />
          <h5>{item.groupName}</h5>
          {/* <h5>
            {JSON.stringify(groupRtlist)}== {JSON.stringify(userInfo.uid)}
          </h5> */}

          {/* aikhne reuest er condition ta check korbo jode request jay taile panding button show korbe */}
          {groupRtlist.includes(userInfo.uid + item.gid) ? (
            <>
              <Button variant="contained" color="success">
                p
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handlecancel(item)}
              >
                cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => handlejoingroup(item)}>
              Joingroup
            </Button>
          )}
        </div>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Group
          </Typography>

          <Typography
            id="modal-modal-description"
            display={"flex"}
            flexDirection={"column"}
            sx={{ mt: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Group-Name"
              variant="outlined"
              sx={{ marginBottom: "20px" }}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Group-Tag"
              variant="outlined"
              onChange={(e) => setGroupTag(e.target.value)}
            />
            <div className="modal__create__group">
              <Button onClick={handleCreategroup} variant="contained">
                Create
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Grouplist;
