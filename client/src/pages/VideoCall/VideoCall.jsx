import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userDataApi } from "../../services/api";
import { SetUserData } from "../../features/users/UserReducer";
import { socket } from "../../Socket";
const VideoCall = () => {
  const user = useSelector((state) => state.user.user);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const [user2,setUser2]=useState(null)

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document.body.style.backgroundImage = "none";
     userDataApi().then((res) => {
      dispatch(SetUserData(res.data));
    });
  }, []);

  useEffect(() => {
    if(socket){
       socket.on("videoCallRejected", () => {
      console.error('hii call is being rejected');
      window.close()
    })
    }
   
  }, [])

  let zc

  const myMeeting = async (element) => {
    const appID = 210004452;
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRETE;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      user._id,
      user.fullName
    );
     zc = ZegoUIKitPrebuilt.create(kitToken);

    const onLeaveRoom = () => {
      zc.destroy()
      window.close()
    };
    
    const onUserJoin=(users)=>{
setUser2(users[0].userID);
    }

    const onUserLeave=()=>{
      window.close()
    }
  
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,
      showLeavingView: false,
      onLeaveRoom: onLeaveRoom,
      onUserJoin:onUserJoin,
      onUserLeave:onUserLeave
    });
  };


  return (
    <div>
      {user && (
        <div
          ref={myMeeting}
          className="myCallContainer"
          style={{ width: "100vw", height: "100vh" }}
        ></div>
      )}
    </div>
  );
};

export default VideoCall;
