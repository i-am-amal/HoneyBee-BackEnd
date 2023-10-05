import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import Chip from "@mui/joy/Chip";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useEffect } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import WineBar from "@mui/icons-material/WineBar";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import GenderIcon from "../icons/GenderIcon";
import RelationIcon from "../icons/RelationIcon";
import ReligionIcon from "../icons/ReligionIcon";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function UserProfile({ edit, setEdit }) {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setLoading] = useState(true);
  const navigate=useNavigate()
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: {xs:8 }}}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={10}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 6,
              backdropFilter: "brightness(0.9) blur(15px)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <Box sx={{ width: "100%", height: "40vh", position: "relative" }}>
              <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${user?.coverPic ? user?.coverPic : "/cover-picture.png"})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              >
              <Box display={"flex"} sx={{height:'4rem', backdropFilter: "brightness(-5)",}} alignItems={"center"} component='nav' color="Menu">
                <IconButton sx={{ml:2,fontWeight:'bold'}}  onClick={()=>navigate('/')}>
                  <ArrowBackIosIcon /> 
                </IconButton>
                    <Typography color="black" marginLeft={2} fontFamily={"initial"} fontWeight={'bold'} variant="h5" >
              Profile
              </Typography>
              </Box>
              </Box>
              <Box
                sx={{
                  objectFit: "cover",
                  width: 200,
                  height: 200,
                  borderRadius: "10rem",
                  position: "absolute",
                  top: "100%",
                  left: { xs: "0%",sm:'20%', lg: "0%" },
                  transform: "translate(50%, -50%)",
                }}
                component="img"
                src={user?.profilePic ? user?.profilePic : "/avatar.jpg"}
              />
            </Box>

            <CardContent>
              <Grid container>
                <Grid item xs={2.3} sm={2.5} lg={2.6}></Grid>
                <Grid
                  item
                  xs={6}
                  lg={8}
                  sx={{ mt: { xs: 14, lg: 9, xl: 0 }, ml: 3 }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      fontSize: { sm: "1.5rem",md:'2rem' },
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
                    sx={{ fontSize: { xs: 7,sm:13, lg: 14 } }}
                    variant="subtitle2"
                  >
                    {isLoading ? <Skeleton width="13rem" /> : user.bio}
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: 7,sm:13, lg: 14 } }}
                    variant="subtitle2"
                  >
                    {isLoading ? <Skeleton width="13rem" /> : user.location}
                  </Typography>
                  <Grid
                    item
                    xs={12}
                    lg
                    sx={{
                      my: 3,
                      display: { lg: "flex" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Chip
                      startDecorator={<GenderIcon />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                      {isLoading ? <Skeleton /> : user.gender}
                    </Chip>
                    <Chip
                      startDecorator={<ReligionIcon />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                      {isLoading ? <Skeleton /> : user.faith}
                    </Chip>
                    <Chip
                      startDecorator={<RelationIcon />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                      {isLoading ? <Skeleton /> : user.realationshipStatus}
                    </Chip>
                    <Chip
                      startDecorator={<SmokingRoomsIcon />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                      {isLoading ? <Skeleton /> : user.smoking}
                    </Chip>
                    <Chip
                      startDecorator={<WineBar />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                      {isLoading ? (
                        <Skeleton />
                      ) : user.drinking ? (
                        user.drinking
                      ) : (
                        ""
                      )}
                    </Chip>
                  </Grid>
                </Grid>
                <Grid item xs sx={{ mt: { xs: 14, lg: 9, xl: 0 } }}>
                  <IconButton
                    onClick={() => setEdit(true)}
                    aria-label="edit"
                    size="large"
                  >
                    <EditIcon sx={{ color: "black" }} fontSize="inherit" />
                  </IconButton>
                </Grid>
              
               
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: {sm:"flex"},
                    flexDirection:{sm:'column',lg:'row'},
                    justifyContent:{lg: "end",sm:'center'},
                    alignContent:{lg: "end",sm:'center'},
                    alignItems: {lg: "end",sm:'center'},
                  }}
                >
                  {user?.images.map((image,index) => {
                    return (
                      <Card
                        key={index}
                        sx={{
                          m: 2,
                          width: { xs: 300, sm: 400, lg: 250 },
                          height: { xs: 250, sm: 400, lg: 250 },
                          backgroundImage: `url(${image})`,
                          bgcolor: "lightgray",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default UserProfile;
