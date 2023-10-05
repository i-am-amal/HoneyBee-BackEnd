import * as React from "react";
import { Grid, Skeleton, Typography, Card } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RenderMatchCard from "./RenderMatchCard";
import { SetUserData } from "../../features/users/UserReducer";
import { ShowMatchesApi } from "../../services/api";
import Loader from "../MatchesLoader/Loader";
function MatchSide() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState([]);
  useEffect(() => {
    if (matchedUsers) {
      setLoading(false);
    }
  }, [matchedUsers]);

  useEffect(() => {
    ShowMatchesApi().then((res) => {
      if (res.data.length > 0) {
        setMatchedUsers(res.data);
      } else {
        setIsEmpty(true);
      }
    });
  }, [isLoading]);

  return (
    <Grid container sx={{ minHeight: "84vh" }}>
      {isLoading ? (
        // Skeleton loader while loading users
        <Grid item xs={12} md={6}>
          <Skeleton variant="rectangular" height={118} />
        </Grid>
      ) : (
        <Grid item xs={12} lg={11} container>
          {matchedUsers.length > 0 ? (
            <RenderMatchCard matches={matchedUsers} isLoading={isLoading} />
          ) : (
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "38rem",
                borderRadius: 6,
                backdropFilter: "brightness(0.9) blur(15px)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isEmpty ? (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    height: "100%",
                  }}
                >
                  <Grid sx={{}}>
                    <lottie-player
                      src="https://lottie.host/fd72ffec-6def-4055-bd06-6cbd9333bb25/ajpBAR9H9V.json"
                      background="transparent"
                      speed="1"
                      style={{ width: "20rem", height: "20rem" }}
                      loop
                      autoplay
                    ></lottie-player>
                  </Grid>
                </Grid>
              ) : (
                <Loader user={user} />
              )}
            </Card>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default MatchSide;
