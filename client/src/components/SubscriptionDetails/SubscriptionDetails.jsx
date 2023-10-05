import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card, CardContent, Grid } from "@mui/material";
import {
  GoldSubscriptionApi,
  PaymentSuccessApi,
  PlatinumSubscriptionApi,
} from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SetUserData } from "../../features/users/UserReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionDetails = () => {
  let query = new URLSearchParams(window.location.search);
  const user = useSelector((state) => state.user.user);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!load && user) {
      setLoad(true);
      if (query.get("pack")) {
        const pack = query.get("pack");
        PaymentSuccessApi({ pack: pack })
          .then((res) => {
            dispatch(SetUserData(res.data));
            navigate("/HoneyVip");
          })
          .catch(() => {
            setLoad(false);
          });
      }
    }
  }, [user]);
  const handleGold = async () => {
    try {
      const email = {
        email: user.email,
      };
      GoldSubscriptionApi(email)
        .then((res) => {
          window.location.href = res.data.url;
        })
        .catch((error) => {
          console.error("Error occurred during API call:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlatinum = async () => {
    try {
      const data = {
        email: user.email,
      };
      PlatinumSubscriptionApi(data)
        .then((res) => {
          window.location.href = res.data.url;
        })
        .catch((error) => {
          console.error("Error occurred during API call:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid
      item
      xs={11.9}
      lg={11}
      container
      sx={{ mb: 10, position: "relative" }}
    >
      <Card
        className="CardItems"
        variant="outlined"
        sx={{
          width: "100%",
          minHeight: "70vh",
          borderRadius: 6,
          backdropFilter: "brightness(0.9) blur(15px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
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
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography
                variant="h3"
                noWrap
                component="a"
                href="/"
                sx={{
                  mt: 1,
                  mr: 1,
                  fontFamily: "Montez",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                VIP
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                mt: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{ color: "goldenrod", mb: 2 }}
              >
                <b>GOLD TIER SUBSCRIPTION</b>
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                component="ul"
                sx={{ color: "goldenrod" }}
              >
                <li>
                  Video Call - Gold tier subscribers can initiate video calls
                  with Matched users.
                </li>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                my: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {user?.HoneyVipType?.includes("gold") ||
              user?.HoneyVipType.includes("platinum") ? (
                <Button
                  variant="contained"
                  color="success"
                  large
                  fullWidth
                  disabled
                  onClick={handleGold}
                >
                  You have Gold Access
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  large
                  fullWidth
                  onClick={handleGold}
                  sx={{
                    backgroundColor: "goldenrod",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "goldenrod",
                    },
                  }}
                >
                  Access Gold Now for just RS:500
                </Button>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography variant="h6" noWrap sx={{ color: "grey", mb: 2 }}>
                <b>PLATINUM TIER SUBSCRIPTION</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                component="ul"
                sx={{ color: "grey" }}
              >
                <li>
                  Video Call - Gold tier subscribers can initiate video calls
                  with Matched users.
                </li>
                <li>
                  Advanced Search Functionality Platinum tier subscribers can
                  enjoy advanced search capabilities. They can search for other
                  users based on criteria such as name, age, interests,
                  location, and any other relevant information. This feature
                  enables them to find potential matches more specifically.
                </li>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                my: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {user?.HoneyVipType.includes("platinum") ? (
                <Button
                  variant="contained"
                  color="inherit"
                  large
                  fullWidth
                  disabled
                  onClick={handlePlatinum}
                >
                  You have Platinum Access
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  large
                  fullWidth
                  onClick={handlePlatinum}
                  sx={{
                    backgroundColor: "grey",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                >
                  Access Platinum Now for just RS:1500
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SubscriptionDetails;
