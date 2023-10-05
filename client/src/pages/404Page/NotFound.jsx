import React from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
function NotFound() {
  const Navigate = useNavigate();
  return (
    <Grid
      container
      style={{ display: "flex", justifyContent: "center", height: "100vh" }}
    >
      <Grid>
        <lottie-player
          src="https://assets7.lottiefiles.com/packages/lf20_4qhciwpm.json"
          background="transparent"
          speed="1"
          style={{ width: "40rem", height: "40rem" }}
          loop
          autoplay
        ></lottie-player>
        <Button
          onClick={() => {
            Navigate("/");
          }}
          fullWidth
          variant="outlined"
          color="warning"
        >
          Go Home
        </Button>
      </Grid>
    </Grid>
  );
}

export default NotFound;
