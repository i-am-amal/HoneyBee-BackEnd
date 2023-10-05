import React from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
function IntialLoader() {
  const Navigate = useNavigate();
  return (
    <Grid
      container
      sx={{ display: "flex", justifyContent: "center", height: "100vh",alignContent:'center' }}
    >
      <Grid sx={{

      }}>
        <lottie-player
          src="https://lottie.host/d5f9eaf7-96cd-42ff-a4fb-a0c824a8ceaf/azbPfyDklA.json"
          background="transparent"
          speed="3"
          style={{ width: "20rem", height: "20rem" }}
          loop
          autoplay
        ></lottie-player>
       
      </Grid>
    </Grid>
  );
}

export default IntialLoader;
