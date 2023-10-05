import React from "react";
import { Modal, Box, Typography, Button, IconButton, Avatar } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useNavigate } from "react-router-dom";
import {socket} from '../../Socket'
function IncomingCallModal({ open, close }) {
  const navigate=useNavigate()
  const onAcceptCall = () => {
    
    window.open(`/room/${open?.conversationId}`, "_blank", "height=400,width=600");
    close()
  };
  const onDeclineCall = () => {
    close()
    socket.emit("callRejected", open)
  };

  return (
    <Modal open={open.modal} >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 10,
          borderRadius: 4,
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="div" textAlign="center">
            Incoming {open.video?"Video":"Audio"} Call
          </Typography>
          <Avatar src={open?.profilePic} sx={{ width: 80, height: 80, my: 2, mx: "auto" }} />
          <Typography variant="h6" component="div">
            {open?.fullName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 15 }}>
          <IconButton color="success" onClick={onAcceptCall}>
            <CallIcon fontSize="large" />
          </IconButton>
          <IconButton color="error" onClick={onDeclineCall}>
            <CallEndIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}

export default IncomingCallModal;
