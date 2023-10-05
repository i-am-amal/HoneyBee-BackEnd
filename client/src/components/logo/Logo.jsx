import * as React from 'react';
import {Zoom} from '@mui/material';
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
function Logo() {
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(()=>{
setOpen(true)
    },2000)
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    document.body.style.backgroundImage = "none";
  }, []);

  
const logo = (
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
  );
  
  const slogan=(
    <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              letterSpacing: { xs: ".1rem", lg: ".5rem" },
              color: "inherit",
            }}
          >
            Connecting Hearts, Creating Memories.
          </Typography>
  )

  return (
    <div>
   
    
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid xs={12}>
                
        <Zoom in="true" style={{ transitionDelay:  '500ms' }}>
          {logo}
        </Zoom>
      

        
    { open &&  (   <Zoom in="true" style={{ transitionDelay:  '500ms' }}>{slogan}</Zoom>)}
         
        </Grid>
      </Grid>
    </div>
  );
}

export default Logo;
