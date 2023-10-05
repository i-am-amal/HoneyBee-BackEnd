import * as React from "react";
import { useEffect } from "react";
import {Box, Link as MuiLink } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { Grid, Typography, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import GoogleIcon from '@mui/icons-material/Google';
import {useNavigate } from 'react-router-dom'
import { getGoogleUrl } from '../../Utils/getGoogleUrl';
function Landing() {
  const location = useLocation()
let from = (location.state && location.state.from && location.state.from.pathname) || '/';
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document.body.style.backgroundImage = "none";
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant="outlined"
        >
          <ModalClose />
         
          <Button sx={{mt:'2.5rem',color:'black'}}   onClick={()=>navigate('/login')}  startIcon={<LocalPhoneIcon/>} fullWidth >
            Sign In with Phone Number
          </Button>
         
          <MuiLink
            href={getGoogleUrl(from)}
          >
             <Button  sx={{mt:'1rem',color:'black'}} startIcon={<GoogleIcon/>} fullWidth  autoFocus>
            Sign in with Google
          </Button>
          </MuiLink>
       
        
        </ModalDialog>
      </Modal>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid xs={12}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <FavoriteIcon sx={{ fontSize: "3rem", mr: 1 }} />
            <Typography
              variant="h3"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                fontFamily: "Montez",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HoneyBee
            </Typography>
          </Grid>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              letterSpacing: { xs: ".1rem", lg: ".5rem" },
              color: "inherit",
            }}
          >
            Connecting Hearts, Creating Memories.
          </Typography>{" "}
          <Grid sx={{ mx: { md: "15rem", lg: "20rem" } }}>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              sx={{ mt: "1rem", borderRadius: "3rem" }}
              onClick={handleOpen}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
