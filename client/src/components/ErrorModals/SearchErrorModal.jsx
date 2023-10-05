import React from "react";
import { Modal, Box, Typography, Button, Grid, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

function SearchErrorModal({ open }) {
const navigate=useNavigate()
  const onDeclineCall = () => {
    navigate('/HoneyVip')
  };

  return (
    <Modal open={open} >
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
        <Button
          sx={{ position: "absolute", top: 8, right: 8 }}
          color="inherit"
          onClick={onDeclineCall}
        >
          <CloseIcon fontSize="large" />
        </Button>

        <Box>
        <Grid
   container
   sx={{ display: "flex", justifyContent: "center",alignContent:'center',height:'100%' }}
 >
   <Grid sx={{

   }}>
     <lottie-player
       src="https://lottie.host/74df4dfe-f5db-4a8f-b7c8-3235d3fffcd1/uPOqoRkPak.json"
       background="transparent"
       speed="1"
       style={{ width: "20rem", height: "20rem" }}
       
       autoplay
     ></lottie-player>
    
   </Grid>
 </Grid> 
          <Typography variant="overline" textAlign="center">
            Inorder to use Search you must have  HoneyPlatinum Subscription.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default SearchErrorModal;
