import React from "react";
import bd from "../assets/cover.png";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";

const Profile = () => {
  return (
    <div className="profile__container">
      <div>
        <img src={bd} alt="" />
      </div>
      <div className="profile__box">
        <div className="profile">
          <img src={profile} alt="" />
        </div>
        <div>
          <h3>Dmitry Kargaev</h3>
          <p>
            Freelance UX/UI designer, 80+ projects in web design, mobile apps
            (iOS & android) and creative projects. Open to offers.
          </p>
          <Button variant="contained">Contact info</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
