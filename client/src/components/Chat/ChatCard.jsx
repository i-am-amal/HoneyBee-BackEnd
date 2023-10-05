import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import axios from "../../Axios";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatInput from "./ChatInput";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useNavigate } from "react-router-dom";
import { ReadMsgsApi, addNewMSgApi, getAllmsgsApi } from "../../services/api";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import VIdeoCallModal from "../ErrorModals/VIdeoCallModal";
function ChatCard({ currentChat, setCurrentChat, socket,onlineUsers }) {
  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [typing, setTyping] = useState(null);
  const [modal,setModal]=useState(false)
  
  useEffect(() => {
    console.log(onlineUsers);
    if (onlineUsers.length > 0) {
      if (onlineUsers.includes(currentChat._id)) {
  setCurrentChat((prev)=>({...prev,isOnline:true}))
      }else{
        setCurrentChat((prev)=>({...prev,isOnline:false}))  
      }
    }
  }, [onlineUsers]);

  const handleClose=()=>{
    setModal(false)
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  const data = {
    from: user._id,
    to: currentChat._id,
  };
  const navigate = useNavigate();
  useEffect(() => {
    getAllmsgsApi(data)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        navigate("/Chat");
      });
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = {
      from: user._id,
      to: currentChat._id,
      message: msg,
      messageType: "text",
      conversationId: currentChat.conversationId,
    };
    socket.emit("send-msg", data);

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket) {
      socket.on("show-typing", (to) => {
        setTyping(true);
      });

      socket.on("hide-typing", (to) => {
        setTyping(false);
      });

      socket.on("msg-recieve", (data) => {
        const id = {
          msgId: data._id,
        };
        ReadMsgsApi(id);
        setArrivalMessage({
          fromSelf: false,
          message: data.message,
          messageType: data.messageType,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleVideoCall = () => {
    console.log(user)
    if(user.HoneyVipType.length>0 || user.HoneyVipType.includes('gold')){
    const data = {
      conversationId: currentChat.conversationId,
      to: currentChat._id,
      from: user._id,
      profilePic: user.profilePic,
      fullname: user.fullName,
    };
    socket.emit("videoCall", data)
    window.open(
      `/room/${currentChat.conversationId}`,
      "_blank",
      "height=400,width=600"
    );
  }else{
    setModal(true)
  }
  };

  const messageSection = () => {
    return messages.map((msg, index) => {
      if (msg.fromSelf) {
        return (
          <Box
            ref={scrollRef}
            key={index}
            sx={{
              margin: "1rem 1rem 0.5rem 0rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                backgroundColor: "black",
                display: "inline-block",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem 0.5rem 1rem",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: "black",
                  display: "inline",
                  color: "white",
                }}
              >
                {msg.message}
              </Typography>
            </Box>
            <Avatar
              sx={{ width: 29, height: 29, ml: 1 }}
              src={user.profilePic}
            />
          </Box>
        );
      } else {
        return (
          <Box
            ref={scrollRef}
            key={index}
            sx={{
              margin: "1rem 1rem 0.5rem 0rem",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Avatar
              sx={{ width: 29, height: 29, mr: 1 }}
              src={currentChat.profilePic}
            />{" "}
            <Box
              sx={{
                backgroundColor: "lightgrey",
                display: "inline-block",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem 0.5rem 1rem",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: "lightgrey",
                  display: "inline",
                  color: "black",
                }}
              >
                {msg.message}
              </Typography>
            </Box>
          </Box>
        );
      }
    });
  };

  return (
    <Grid container>
      <VIdeoCallModal open={modal} close={handleClose}  />
      <Grid
        item
        container
        xs={12}
        sx={{
          width: "100%",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          borderBottom: "solid 1px #DFDFDF",
        }}
      >
        <Grid item xs={1} sm={0.8} md={0.5} lg={0.5} sx={{mr:1}}>
          <Button color="inherit" onClick={() => setCurrentChat(undefined)}>
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item xs>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              m: 1,
            }}
          >
          {currentChat.isOnline ? (
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        sx={{ mr: 2 }}
                        variant="dot"
                      >
                        <Avatar
                          alt={currentChat.name}
                          src={currentChat.profilePic}
                        />
                      </StyledBadge>
                    ) : (
                      <Avatar
                        sx={{ mr: 2 }}
                        alt={currentChat.name}
                        src={currentChat.profilePic}
                      />
                    )}

            <Typography sx={{ fontWeight: "500" }}>
              {currentChat.fullName}
              {typing && (
                <Typography
                  variant="caption"
                  sx={{ color: "green", display: "block" }}
                >
                  Typing...
                </Typography>
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleVideoCall}>
            <VideoCallIcon sx={{ color: "black" }} />
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ minHeight: "28rem", maxHeight: "28rem" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "7px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "darkgrey",
              borderRadius: "2rem",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "grey",
              borderRadius: "2rem",
            },
          }}
        >
          {messageSection()}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <ChatInput
          handleSendMsg={handleSendMsg}
          currentChat={currentChat}
          user={user}
        />
      </Grid>
    </Grid>
  );
}

export default ChatCard;
