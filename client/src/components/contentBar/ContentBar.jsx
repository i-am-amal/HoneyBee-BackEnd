import * as React from "react";
import { MuiOtpInput } from 'mui-one-time-password-input'
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { context } from "../../ContextProvider";
import { useContext } from "react";
import axios from "../../Axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ContentBar() {
  const navigate=useNavigate()
const [userDetails,setUserdetails]=useContext(context)
const [loading,setLoading]=useState(false)
 
  const handleSubmit = (event) => {
    if(!loading){
  
    }
  }
 
  return (
    <>
      <Grid
        container
        justifyContent="end"
        alignItems="end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item >
          <Card
            variant="outlined"
            sx={{
              borderRadius: 6,
              backdropFilter: "brightness(0.9) blur(15px)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <CardContent>
              <Box
                component="form"
                noValidate
                sx={{
                  my: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                }}
              >    
              <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    mb: { xs: 1, sm: 0 },
                    fontFamily: "Roboto",
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                 Enter the OTP
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ textAlign: "center", mb: 3 }}>
                  We have sent an OTP to the phone number you provided
                </Typography>
              </Grid>
              <Grid >
             
              </Grid>
            </Grid>
             
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                {!loading?"Continue":"Loading"}  
                </Button>
                <Grid container></Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

