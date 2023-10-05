import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Grid, Skeleton } from "@mui/material";
import { Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ImageContent from "./ImageContent";
import ChipsContent from "./ChipsContent";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Loader from "../MatchesLoader/Loader";
import KeepMountedModal from "../Modal/KeepMountedModal";
function RenderContentData({
  user,
  isLoading,
  filteredUsers,
  likeHandler,
  dislikeHandler,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState("");

  const handleSubmit = (user) => {
    setUsers(user);
    setOpenModal(true);
  };
  return (
    <>
      {isLoading ? (
        <Grid item xs={12} sx={{ my: 2, position: "absolute", width: "100%" }}>
          <Loader user={user} />
        </Grid>
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <Grid
            item
            xs={12}
            sx={{ my: 2, position: "absolute", width: "100%" }}
            key={user._id}
          >
            <Card
              className="CardItems"
              variant="outlined"
              sx={{
                mb: 4,
                minHeight: "70vh",
                borderRadius: 6,
              
              }}
            >
              <Box sx={{ width: "100%", height: "40vh", position: "relative" }}>
                <Box
                  sx={{ objectFit: "cover", width: "100%", height: "100%" }}
                  component="img"
                  loading="lazy"
                  src={user?.coverPic ? user?.coverPic : "/cover-picture.png"}
                />
                <Box
                  sx={{
                    objectFit: "cover",
                    width: 150,
                    height: 150,
                    borderRadius: "5rem",
                    position: "absolute",
                    top: "100%",
                    left: { xs: "10%",sm:'33%', lg: "0%" },
                    transform: "translate(50%, -50%)",
                  }}
                  loading="lazy"
                  component="img"
                  src={user?.profilePic ? user?.profilePic : "/avatar.jpg"}
                />
              </Box>

              <CardContent>
                <Grid container sx={{ width: "100%" }}>
                  <Grid item xs={2.6}></Grid>
                  <Grid item xs={7} lg={8} sx={{ mt: { xs: 10, lg: 0 } }}>
                    <Typography
                      sx={{
                        textAlign: { xs: "center", lg: "" },
                        fontFamily: "sans-serif",
                        fontSize: { lg: "2rem" },
                        fontWeight: "bold",
                      }}
                    >
                      {isLoading ? <Skeleton width="15rem" /> : user.fullName}{" "}
                      {isLoading ? (
                        <Skeleton width="5rem" />
                      ) : (
                        <Typography variant="caption">{user.age}</Typography>
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: { xs: "center", lg: "" },
                        fontSize: { xs: 7, lg: 14 },
                      }}
                      variant="subtitle2"
                    >
                      {isLoading ? (
                        <Skeleton width="13rem" />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "end",
                          }}
                        >
                          <LocationOnIcon />
                          Lives in {user.location}
                        </Box>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid sx={{ mt: 10 }} item xs={12}>
                    <Grid
                      sx={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        startIcon={<ThumbDownAltIcon />}
                        color="inherit"
                        variant="outlined"
                        sx={{ borderRadius: "1rem", px: { xs: 1, lg: 13 } }}
                        size="medium
                            
                            "
                        onClick={() => dislikeHandler(user._id)}
                      >
                        DisLike
                      </Button>

                      <Button
                        startIcon={<ThumbUpIcon />}
                        color="error"
                        variant="outlined"
                        sx={{ borderRadius: "1rem", px: { xs: 1, lg: 13 } }}
                        size="medium"
                        onClick={() => likeHandler(user._id)}
                      >
                        Like
                      </Button>
                    </Grid>
                    <Grid item sx={{ mt: 3 }} xs={12}>
                      <Grid
                        sx={{
                          display: "flex",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: "1rem", px: { xs: 1, lg: 13 } }}
                          size="medium"
                          onClick={() => handleSubmit(user)}
                        >
                          Vist Profile
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <KeepMountedModal
              user={users}
              setUser={setUsers}
              open={openModal}
              setOpen={setOpenModal}
              isLoading={isLoading}
            />
          </Grid>
        ))
      ) : (
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
            <Grid
      container
      sx={{ display: "flex", justifyContent: "center",alignContent:'center',height:'100%' }}
    >
      <Grid sx={{

      }}>
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
          </Card>
          </Grid>
      )}
    </>
  );
}
export default RenderContentData;
