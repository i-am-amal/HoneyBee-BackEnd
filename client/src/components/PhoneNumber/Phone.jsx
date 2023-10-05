import React, { useEffect, useState } from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Typography, Grid } from "@mui/material";
import "@fontsource/Roboto";

const Phone = ({ changePhone,error,setError }) => {
  const [value, setValue] = React.useState("");
  
  useEffect(() => {
    if(value){
       if (matchIsValidTel(value)) {
      setError(false)
      addPhone();
    }
    }
  }, [value]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const addPhone = () => {
    changePhone(value);
  };

  return (
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
          Enter Your Phone Number
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ textAlign: "center", mb: 3 }}>
          We will send an OTP to this phone number
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
      <MuiTelInput
  {...(error ? { error: true } : {})}
  defaultCountry="IN"
  variant="standard"
  value={value}
  onChange={handleChange}
/>
      </Grid>
    </Grid>
  );
};

export default Phone;
