import * as React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetUser } from "../../features/RegisterUser/RegisterReducer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Auth_user } from "../../features/users/AuthReducer";
import Timer from "./Timer";
import { otpApi, phoneNumberApi } from "../../services/api";
export default function Otp() {
  const Phone = useSelector((state) => state.phone);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const otpInputRef = useRef(null);
  useEffect(() => {
    if (otpInputRef.current) {
      const inputElement = otpInputRef.current.querySelector("input");
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, []);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const handleResend = () => {
    const data = {
      phone: Phone.number,
    };
   phoneNumberApi(data).then((res) => {
      if (res.data.success) {
      } else {
        setError(res.data.message);
      }
    });
  };


  const handleSubmit = (event) => {
    if (otp.length !== 6) setError("Enter the otp");
    else {
      setError(false);
      if (!loading) {
        setLoading(true);
        const data = {
          otp,
          phone: Phone.number,
        };

       otpApi(data).then((res) => {
            setLoading(false);
            if (res.data.success) {
              if (res.data.newUser) {
                dispatch(SetUser());
                navigate(res.data.redirect);
              } else {
                localStorage.setItem(
                  "authorization.user",
                  JSON.stringify(res.data.token)
                );
                dispatch(Auth_user());
                navigate(res.data.redirect);
              }
            } else {
              setError(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
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
                  <Grid>
                    <MuiOtpInput
                      ref={otpInputRef}
                      {...(error ? { color: "tomato" } : {})}
                      length={6}
                      value={otp}
                      onChange={handleChange}
                    />

                    {error && (
                      <Typography variant="subtitle1" sx={{ color: "red" }}>
                        *{error}
                      </Typography>
                    )}
                    <Timer initialTime={30} onResend={handleResend} />
                  </Grid>
                </Grid>

                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  {!loading ? "Continue" : "Loading"}
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
