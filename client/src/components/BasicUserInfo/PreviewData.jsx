import {
    Box,
    Button,
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
 
function PreviewData({user,setStep,handleSubmit, coverPicREF,
    profilePicREF,
    image0,
    image1,
    image2,
    loading
  }) {
useEffect(()=>{
console.log( coverPicREF,
    profilePicREF,
    image0,
    image1,
    image2,);
},[])
    const handleAllSet=()=>{
handleSubmit()
    }
  return (
    <CardContent>
    
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
            <Grid item xs={12}>
                  <Typography
                    sx={{
                      my: { xs: 3, sm: 3, lg: 0 },
                      fontFamily: "Roboto",
                      fontWeight: 700,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                   <IconButton sx={{fontWeight:'bold'}}  onClick={()=>setStep(1)}>
                  <ArrowBackIosIcon /> 
                </IconButton>  Account Preview
                  </Typography>
                </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} xl={10}>
          <Card
            variant="outlined"
            sx={{
                mt:2,
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
                <Grid item xs={2.3} sm={2.5} lg={3}></Grid>
                <Grid
                  item
                  xs={6}
                  lg={8.5}
                  sx={{ mt: { xs: 14, lg: 9, xl: 0 }, ml: 3 }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      fontSize: { sm: "1.5rem",md:'2rem',lg:'1.5rem' },
                      fontWeight: "bold",
                    }}
                  >
                    { user.fullName}
                   
                      <Typography variant="caption">{user.age}</Typography>
                   
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: 7,sm:13, lg: 14 } }}
                    variant="subtitle2"
                  >
                    { user.bio}
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: 7,sm:13, lg: 14 } }}
                    variant="subtitle2"
                  >
                    { user.location}
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
                      { user.gender}
                    </Chip>
                    <Chip
                      startDecorator={<ReligionIcon />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                      { user.faith}
                    </Chip>
                    <Chip
                      startDecorator={<RelationIcon />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                      { user.realationshipStatus}
                    </Chip>
                    <Chip
                      startDecorator={<SmokingRoomsIcon />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                      { user.smoking}
                    </Chip>
                    <Chip
                      startDecorator={<WineBar />}
                      color="neutral"
                      size="lg"
                      variant="soft"
                    >
                    
                    { user.drinking }
                     
                    </Chip>
                  </Grid>
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
                  {user.images0&&(
                      <Card
                        key={index}
                        sx={{
                          m: 2,
                          width: { xs: 300, sm: 400, lg: 250 },
                          height: { xs: 250, sm: 400, lg: 250 },
                          backgroundImage: `url(${user.images0})`,
                          bgcolor: "lightgray",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      />
                  )}
                
                  {user.images1&&(
                      <Card
                        key={index}
                        sx={{
                          m: 2,
                          width: { xs: 300, sm: 400, lg: 250 },
                          height: { xs: 250, sm: 400, lg: 250 },
                          backgroundImage: `url(${user.images1})`,
                          bgcolor: "lightgray",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      />
                  )}
                
                  {user.images2&&(
                      <Card
                        key={index}
                        sx={{
                          m: 2,
                          width: { xs: 300, sm: 400, lg: 250 },
                          height: { xs: 250, sm: 400, lg: 250 },
                          backgroundImage: `url(${user.images2})`,
                          bgcolor: "lightgray",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      />
                  )}
                
                  
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid sx={{
                 display: "flex",
                 justifyContent:'center',
                 mt:3
            }}>
                <Button
                  size="large"
                  color="warning"
                  variant="outlined"
                
                  onClick={handleAllSet}
                >
                {loading?'Loading':'All set'}   
                </Button> 
            </Grid>
    </CardContent>
  )
}

export default PreviewData