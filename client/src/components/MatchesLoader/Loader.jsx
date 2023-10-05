import React from "react";
import "./Loader.css";

const Loader = ({ user }) => {
  const profilePic = user?.profilePic;

  return (
    <div  className="loader-container">
      <div className="loader-animation">
        <div className="heart"></div>
        {profilePic && (
          <img loading="true" src={profilePic} alt="User" className="user-image" />
        )}
      </div>
    </div>
  );
};

export default Loader;
